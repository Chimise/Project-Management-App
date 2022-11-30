/**
 * @jest-enviroment node
 */
 import { NextApiResponse } from "next";
 import {ExtendedRequest} from '../../controllers/user';
 import mockHandler, {
   teardownDatabase,
   setupDatabase,
   userOne,
   userReportOne,
   getAuthenticatedUser
 } from "../../test";
 import {find, viewReport} from '../../controllers/report';
 import { getKnex } from "../../utils/connectDb";
 
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
 
 test('An authenticated user can find fetch all reports', async () => {
   const user = await getAuthenticatedUser(knex, userOne.id);
   const { req, res, next } = mockHandler<ExtendedRequest, NextApiResponse>();
   req.user = user;
   await find(req, res, next);
   expect(res._getStatusCode()).toBe(200);
   expect(res._getJSONData()).toHaveLength(1);
 });
 
 test('An authenticated user can view and update report', async () => {
   const user = await getAuthenticatedUser(knex, userOne.id);
   const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>({
     query: {
       id: userReportOne.id
     }
   });
   req.user = user;
   await viewReport(req, res, next);
   expect(res._getStatusCode()).toBe(200);
   expect(res._getJSONData().viewed).toBe(true);
 })