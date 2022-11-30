/**
 * @jest-enviroment node
 */
import { NextApiResponse } from "next";
import {ExtendedRequest} from '../../controllers/user';
import mockHandler, {
  teardownDatabase,
  setupDatabase,
  userOne,
  userMessageOne,
  getAuthenticatedUser
} from "../../test";
import {find, viewMessage} from '../../controllers/message';
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

test('An authenticated user can find fetch all messages', async () => {
  const user = await getAuthenticatedUser(knex, userOne.id);
  const { req, res, next } = mockHandler<ExtendedRequest, NextApiResponse>();
  req.user = user;
  await find(req, res, next);
  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData()).toHaveLength(2);
});

test('An authenticated user can view and update message', async () => {
  const user = await getAuthenticatedUser(knex, userOne.id);
  const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>({
    query: {
      id: userMessageOne.id
    }
  });
  req.user = user;
  await viewMessage(req, res, next);
  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData().viewed).toBe(true);
})