/**
 * @jest-enviroment node
 */
import { NextApiResponse } from "next";
import {ExtendedRequest} from '../../controllers/user'
import { create, find, findOne, deleteOne } from "../../controllers/project";
import mockHandler, {
  teardownDatabase,
  setupDatabase,
  getAuthenticatedUser,
  projectThree,
  projectOne
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

test('An authenticated user cannot create a new project without a name', async () => {
    const user = await getAuthenticatedUser(knex, 2);
    const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>();
    req.user = user;
    await create(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().isBoom).toBe(true);
})

test('A authenticated user can create a project', async () => {
    const user = await getAuthenticatedUser(knex, 2);
    const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>({body: {
        name: 'Manage your tasks'
    }});
    req.user = user;
    await create(req, res, next);
    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData().name).toMatch('Manage your tasks');
})

test('An unauthenticated user cannot create a project', async () => {
    const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>({body: {
        name: 'Manage your tasks'
    }});
    await create(req, res, next);
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData().isBoom).toBe(true);
    expect(next).toHaveBeenCalled();

});

test('An authenticated user only fetches the projects he created', async () => {
    const user = await getAuthenticatedUser(knex, 1);
    const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>();
    req.user = user;
    await find(req, res, next);
    expect(res._getJSONData()).toHaveLength(2);
})

test('An authenticated user cannot fetch a project he did not create', async () => {
    const user = await getAuthenticatedUser(knex, 1);
    const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>({query: {
        id: projectThree.id
    }});
    req.user = user;
    await findOne(req, res, next);
    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().isBoom).toBe(true);
})

test('An authenticated user can fetch a project that he created', async () => {
    const user = await getAuthenticatedUser(knex, 1);
    const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>({query: {
        id: projectOne.id
    }});
    req.user = user;
    await findOne(req, res, next);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().name).toBe(projectOne.name)
})

test('An authenticated user can delete the project he created', async () => {
    const user = await getAuthenticatedUser(knex, 2);
    const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>({query: {
        id: projectThree.id
    }});
    req.user = user;
    await deleteOne(req, res, next);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().name).toBe(projectThree.name);
})


