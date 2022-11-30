/**
 * @jest-enviroment node
 */
import { NextApiResponse } from "next";
import { ExtendedRequest } from "../../controllers/user";
import {
  create,
  find,
  findOne,
  deleteOne,
  updateOne,
} from "../../controllers/comment";
import mockHandler, {
  teardownDatabase,
  setupDatabase,
  getAuthenticatedUser,
  commentOne,
  taskOne,
  commentFour,
  taskFour,
} from "../../test";
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

test("User can only fetch comments for a particular task", async () => {
  const user = await getAuthenticatedUser(knex, 1);
  const { req, res, next } = mockHandler<ExtendedRequest, NextApiResponse>({
    query: {
      task_id: commentOne.task_id,
      project_id: taskOne.project_id,
    },
  });
  req.user = user;
  await find(req, res, next);
  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData()).toHaveLength(2);
});

test("An authenticated user cannot access comments that he did not create", async () => {
  const user = await getAuthenticatedUser(knex, 1);
  const { req, res, next } = mockHandler<ExtendedRequest, NextApiResponse>({
    query: {
      task_id: commentFour.task_id,
      project_id: taskFour.project_id,
      id: commentFour.id,
    },
  });
  req.user = user;
  await findOne(req, res, next);
  expect(res._getStatusCode()).toBe(404);
  expect(res._getJSONData().output.payload.message).toMatch(/task not found/i);
});

test("An authenticated user can create comment for a task", async () => {
  const user = await getAuthenticatedUser(knex, 2);
  const message = "My latest task";
  const { req, res, next } = mockHandler<ExtendedRequest, NextApiResponse>({
    body: {
      task_id: commentFour.task_id,
      project_id: taskFour.project_id,
      message,
      favorite: true,
      like: true,
    },
  });
  req.user = user;
  await create(req, res, next);
  expect(res._getStatusCode()).toBe(201);
  expect(res._getJSONData().message).toBe(message);
});

test("An authenticated user can update existing comments", async () => {
  const user = await getAuthenticatedUser(knex, 2);
  const message = "My latest task";
  const { req, res, next } = mockHandler<ExtendedRequest, NextApiResponse>({
    query: {
      id: commentFour.id,
    },
    body: {
      task_id: commentFour.task_id,
      project_id: taskFour.project_id,
      message,
      favorite: true,
      like: true,
    },
  });
  req.user = user;
  await updateOne(req, res, next);
  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData().message).toBe(message);
});


test('An authenticated user can delete a task that he created', async () => {
  const user = await getAuthenticatedUser(knex, 1);
  const { req, res, next } = mockHandler<ExtendedRequest, NextApiResponse>({
    query: {
      id: commentOne.id,
      project_id: taskOne.project_id,
      task_id: commentOne.task_id
    }
  });
  req.user = user;
  await deleteOne(req, res, next);
  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData().message).toBe(commentOne.message);
})
