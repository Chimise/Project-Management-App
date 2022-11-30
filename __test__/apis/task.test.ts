/**
 * @jest-enviroment node
 */
import { NextApiResponse } from "next";
import { ExtendedRequest } from "../../controllers/user";
import { create, find, findOne, deleteOne, updateOne } from "../../controllers/task";
import mockHandler, {
  teardownDatabase,
  setupDatabase,
  getAuthenticatedUser,
  taskThree,
  taskFour
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

test("An authenticated user cannot fetch tasks if he does not provide a project id query", async () => {
  const user = await getAuthenticatedUser(knex, 1);
  const { req, res, next } = mockHandler<ExtendedRequest, NextApiResponse>();
  req.user = user;
  await find(req, res, next);
  expect(res._getStatusCode()).toBe(400);
  expect(res._getJSONData().output.payload.message).toMatch(
    /please provide a project id/i
  );
});

test("An authenticated user only fetches tasks he created for a particular project", async () => {
  const user = await getAuthenticatedUser(knex, 1);
  const { req, res, next } = mockHandler<ExtendedRequest, NextApiResponse>({
    query: {
      project_id: 1,
    },
  });
  req.user = user;
  await find(req, res, next);
  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData()).toHaveLength(2);
});

test("An authenticated user can create a task and comment if he provides the valid data", async () => {
  const user = await getAuthenticatedUser(knex, 1);
  const { req, res, next } = mockHandler<ExtendedRequest, NextApiResponse>({
    body: {
      project_id: 1,
      name: "Test apps",
      tag: "code",
      description: "I am testing a lot of apps today",
      status: 1,
      comments: []
    },
  });
  req.user = user;
  await create(req, res, next);
  expect(res._getStatusCode()).toBe(201);
  expect(res._getJSONData().name).toBe("Test apps");
  expect(res._getJSONData().description).toBe(
    "I am testing a lot of apps today"
  );
});

test('An authenticated user can update a task that he created', async () => {
    const user = await getAuthenticatedUser(knex, 1);
  const { req, res, next } = mockHandler<ExtendedRequest, NextApiResponse>({
    query: {
        id: taskThree.id
    },
    body: {
      project_id: taskThree.project_id,
      name: "Test apps",
      description: "I am testing a lot of apps today",
    },
  });
  req.user = user;
  await updateOne(req, res, next);
  expect(res._getStatusCode()).toBe(200);
  const data = res._getJSONData();
  expect(data.name).not.toBe(taskThree.name)
  expect(data.name).toBe('Test apps');
  expect(data.description).toMatch(/i am testing a lot of/i);
})

test('An authenticated user can delete a task he created', async () => {
  const user = await getAuthenticatedUser(knex, 1);
  const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>({
    query: {
      id: taskThree.id,
      project_id: taskThree.project_id
    }
  });

  req.user = user;
  await deleteOne(req, res, next);
  const data = await knex('tasks').select('*').where('id', taskThree.id);
  expect(data).toHaveLength(0);
  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData().name).toBe(taskThree.name);
})

test('An authenticated user cannot delete a task he did not create', async () => {
  const user = await getAuthenticatedUser(knex, 1);
  const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>({
    query: {
      id: taskFour.id,
      project_id: taskFour.project_id
    }
  });

  req.user = user;
  await deleteOne(req, res, next);
  const data = await knex('tasks').select('*').where('id', taskThree.id);
  expect(data).toHaveLength(1);
  expect(res._getStatusCode()).toBe(404);
})