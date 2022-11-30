import {createMocks, Headers, RequestOptions, ResponseOptions} from 'node-mocks-http';
import User, { UserSchema } from "../models/User";
import { ProjectSchema } from "../models/Project";
import { TaskSchema } from "../models/Task";
import { CommentSchema } from "../models/Comment";
import error from '../middlewares/error';
import {Knex} from 'knex';
import {NextApiRequest, NextApiResponse} from 'next';
import bcrypt from 'bcryptjs';
import {UserMessageSchema} from '../models/UserMessage';
import {UserReportSchema} from '../models/UserReport'


type OmitTimestamp<T> = Omit<T, "created_at" | "updated_at">;

export const userOnePassword = "testpassword1";
export const userTwoPassword = "testpassword2";

export const userOne: OmitTimestamp<UserSchema> = {
  id: 1,
  name: "John Doe",
  password: bcrypt.hashSync(userOnePassword, 10),
  email: "johndoe@gmail.com",
};

export const userTwo: OmitTimestamp<UserSchema> = {
  id: 2,
  name: "Steve Ferry",
  password: bcrypt.hashSync(userTwoPassword, 10),
  email: "steveferry@gmail.com",
};

export const projectOne: OmitTimestamp<ProjectSchema> = {
  id: 1,
  name: "My first project",
  user_id: userOne.id,
};

export const projectTwo: OmitTimestamp<ProjectSchema> = {
  id: 2,
  name: "My second project",
  user_id: userOne.id,
};

export const projectThree: OmitTimestamp<ProjectSchema> = {
  id: 3,
  name: "My third project",
  user_id: userTwo.id,
};

export const taskOne: OmitTimestamp<TaskSchema> = {
  id: 1,
  name: "My first task",
  tag: "first",
  description: "This is my first task",
  project_id: projectOne.id,
  user_id: projectOne.user_id,
  status: 0,
};

export const taskTwo: OmitTimestamp<TaskSchema> = {
  id: 2,
  name: "My second task",
  tag: "second",
  description: "This is my second task",
  project_id: projectOne.id,
  user_id: projectOne.user_id,
  status: 1,
};

export const taskThree: OmitTimestamp<TaskSchema> = {
  id: 3,
  name: "My third task",
  tag: "third",
  description: "This is my third task",
  project_id: projectTwo.id,
  user_id: projectTwo.user_id,
  status: 2,
};

export const taskFour: OmitTimestamp<TaskSchema> = {
  id: 4,
  name: "My fourth task",
  tag: "fourth",
  description: "This is my fourth task",
  project_id: projectThree.id,
  user_id: projectThree.user_id,
  status: 1,
};

export const commentOne: OmitTimestamp<CommentSchema> = {
  id: 1,
  message: "My first comment",
  task_id: taskOne.id,
  favorite: false,
  like: true,
  user_id: taskOne.user_id,
};

export const commentTwo: OmitTimestamp<CommentSchema> = {
  id: 2,
  message: "My second comment",
  task_id: taskOne.id,
  favorite: true,
  like: true,
  user_id: taskOne.user_id,
};
export const commentThree: OmitTimestamp<CommentSchema> = {
  id: 3,
  message: "My third comment",
  task_id: taskThree.id,
  favorite: false,
  like: false,
  user_id: taskThree.user_id,
};

export const commentFour: OmitTimestamp<CommentSchema> = {
  id: 4,
  message: "My fourth comment",
  task_id: taskFour.id,
  favorite: false,
  like: true,
  user_id: taskFour.user_id,
};

export const userMessageOne: OmitTimestamp<UserMessageSchema> = {
  id: 1,
  user_id: userOne.id,
  message_id: 1,
  viewed: false
}
export const userMessageTwo: OmitTimestamp<UserMessageSchema> = {
  id: 2,
  user_id: userOne.id,
  message_id: 2,
  viewed: true
}
export const userMessageThree: OmitTimestamp<UserMessageSchema> = {
  id: 3,
  user_id: userTwo.id,
  message_id: 1,
  viewed: true
}
export const userMessageFour: OmitTimestamp<UserMessageSchema> = {
  id: 4,
  user_id: userTwo.id,
  message_id: 2,
  viewed: true
}

export const userReportOne: OmitTimestamp<UserReportSchema> = {
  id: 1,
  user_id: userOne.id,
  report_id: 1,
  viewed: false
}

export const userReportTwo: OmitTimestamp<UserReportSchema> = {
  id: 2,
  user_id: userTwo.id,
  report_id: 1,
  viewed: false
}


export const users = [userOne, userTwo];
export const projects = [projectOne, projectTwo, projectThree];
export const tasks = [taskOne, taskTwo, taskThree, taskFour];
export const comments = [commentOne, commentTwo, commentThree, commentFour];

export const setupDatabase = async (knex: Knex) => {
  await knex("users").insert(users);
  await knex("projects").insert(projects);
  await knex("tasks").insert(tasks);
  await knex("comments").insert(comments);
  await knex('user_messages').insert([userMessageOne, userMessageTwo, userMessageThree, userMessageFour]);
  await knex('user_reports').insert([userReportOne, userReportTwo]);
};

export const teardownDatabase = async (knex: Knex) => {
  await knex("comments").del();
  await knex("tasks").del();
  await knex("projects").del();
  await knex('user_messages').del();
  await knex('user_reports').del();
  await knex("users").del();
};

export const getAuthenticatedUser = async (knex: Knex, id: number) => {
  const user = (await knex<UserSchema>('users').select('*').where('id', id))[0];
  return new User(user);
}


function mockHandler<Request extends NextApiRequest = NextApiRequest, Response extends NextApiResponse = NextApiResponse>({headers = {}, ...others}: RequestOptions = {}, response: ResponseOptions = {}){
  const { req, res } = createMocks<Request, Response>({
    headers: {
      "content-type": "application/json",
      ...headers
    },
    ...others
}, response);

const next = jest.fn().mockImplementation((err?: any) => {
  if(err) {
    error(err, req, res, jest.fn());
  }
})

return {req, res, next};
}

export default mockHandler;


