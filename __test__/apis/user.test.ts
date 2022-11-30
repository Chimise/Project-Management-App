/**
 * @jest-enviroment node
 */
import { NextApiResponse } from "next";
import { currentUser, ExtendedRequest, updateOne } from "../../controllers/user";
import mockHandler, {
  teardownDatabase,
  setupDatabase,
  getAuthenticatedUser,
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



test('Get the current authenticated user', async () => {
    const user = await getAuthenticatedUser(knex, 1);
    const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>()
    req.user = user;
    await currentUser(req, res, next);
    expect(res._getData()).toEqual(JSON.stringify(user));
});

test('Checks that the user\'s name is updated succesfully', async () => {
    const user = await getAuthenticatedUser(knex, 1);
    const {req, res, next} = mockHandler<ExtendedRequest, NextApiResponse>({body: {
        name: 'chimise pro'
    }});
    req.user = user;
    await updateOne(req, res, next);
    const newUser = await getAuthenticatedUser(knex, 1);
    expect(res._getJSONData()).toEqual(JSON.parse(JSON.stringify(newUser)));
});

