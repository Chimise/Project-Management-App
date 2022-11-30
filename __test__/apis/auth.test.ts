/**
 * @jest-enviroment node
 */
import { logIn, signUp } from "../../controllers/auth";
import mockHandler, {
  teardownDatabase,
  setupDatabase,
  userOne,
  userOnePassword
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

test("That the user succesfully login when the correct credentials are provided", async () => {
  const { req, res, next } = mockHandler({
    body: { email: userOne.email, password: userOnePassword },
  });
  await logIn(req, res, next);
  expect(res._getStatusCode()).toBe(200);
  expect(res._getJSONData().user.id).toBe(userOne.id);
  expect(res._getJSONData().user.email).toBe(userOne.email);
});

test('That the user does not login if he provides invalid email', async () => {
    const {req, res, next} = mockHandler({
        body: {email: 'email@email.com', password: userOnePassword}
    });
    await logIn(req, res, next);
    expect(res._getStatusCode()).toBe(401);

    expect(res._getJSONData().output.payload.message).toMatch(/invalid credential/i);
})

test('That the user does not login if an invalid password is provided', async () => {
    const {req, res, next} = mockHandler({
        body: {email: userOne.email, password: 'hello'}
    })

    await logIn(req, res, next);
    expect(res._getStatusCode()).toBe(401);
    expect(res._getJSONData().output.payload.message).toMatch(/invalid credential/i);
})

test('Should signup a new user with a valid email and password', async () => {
    const {req, res, next} = mockHandler({
        body: {email: 'taskr@taskr.com', name: 'Taskr Manager', password: 'password'}
    });

    await signUp(req, res, next);
    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData().user.email).toBe('taskr@taskr.com');
});

test('A user cannot signup with an already existing email', async () => {
    const {req, res, next} = mockHandler({
        body: {email: userOne.email, password: userOnePassword, name: 'Taskr Manager'}
    });
    await signUp(req, res, next);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().output.payload.message).toMatch(/a user with this email/i);
})

