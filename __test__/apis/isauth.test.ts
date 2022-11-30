/**
 * @jest-enviroment node
 */
 import { NextApiResponse } from "next";
 import { ExtendedRequest } from "../../controllers/user";
 import mockHandler, {
   teardownDatabase,
   setupDatabase,
   userOne,
   userOnePassword,
   getAuthenticatedUser
 } from "../../test";
 import { getKnex } from "../../utils/connectDb";
 import {logIn} from '../../controllers/auth';
 import isAuth from "../../middlewares/isAuth";
import { NextResponse } from "next/server";
 
 const knex = getKnex();
 
 beforeEach(async () => {
   await setupDatabase(knex);
 });
 afterEach(async () => {
   await teardownDatabase(knex);
 });
 
 afterAll(() => {
   return knex.destroy();
 });

 test('A user with a valid jwt token will be authorized', async () => {
    const { req, res, next } = mockHandler({
        body: { email: userOne.email, password: userOnePassword },
      });
      await logIn(req, res, next);
      const token = res._getJSONData().jwt as string;
      const { req: newReq, res: newRes, next: newNext } = mockHandler<ExtendedRequest, NextApiResponse>({
        headers: {
            authorization: `Bearer ${token}`
        }
      });
      
      await isAuth(newReq, newRes, newNext);
      expect(newNext).toHaveBeenCalledTimes(1);
      const user = await getAuthenticatedUser(knex, userOne.id);
      expect(newReq.user).toEqual(user);
 });

 test('A user without a valid token will not be authorized', async () => {
    const token = 'jwttoken';
    const { req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>({
        headers: {
            authorization: `Bearer ${token}`
        }
      });
    await isAuth(req, res, next);
    expect(res._getStatusCode()).toBe(500);
 })

 test('A user without a token will not be authorized', async () => {
    const { req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>();
    await isAuth(req, res, next);
    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData().output.payload.message).toMatch(/invalid data/i);
 })