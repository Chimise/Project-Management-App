import bcrypt from "bcryptjs";
import { getKnex } from "../utils/connectDb";
import type { BaseSchema } from "../utils";
import Project, { ProjectSchema } from "./Project";
import UserMessage from './UserMessage';
import type { Message } from './UserMessage';
import type { Report } from "./UserReport";
import UserReport from "./UserReport";
import testUser from '../testUser';
import data from '../knex/data.js';
import {TaskSchema} from "./Task";
import { CommentSchema } from "./Comment";

export interface UserSchema extends BaseSchema {
  name: string;
  email: string;
  password: string;
}


class User {
  id: number;
  name: string;
  email: string;
  password!: string;
  created_at: string;
  updated_at: string;
  projects: Project[];
  constructor({
    id,
    name,
    email,
    password,
    created_at,
    updated_at,
  }: UserSchema) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.projects = [];
  }

  async save() {
    const knex = getKnex();
    this.updated_at = new Date().toISOString();
    await knex<UserSchema>("users")
      .update({
        name: this.name,
        password: this.password,
        updated_at: this.updated_at,
      })
      .where("id", this.id);
  }

  set _password(value: string) {
    this.password = bcrypt.hashSync(value, 10);
  }

  async remove() {
    const knex = getKnex();
    await knex<UserSchema>("users").where("id", this.id).del();
  }

  async getProjects() {
    const knex = getKnex();
    const projects = await knex<UserSchema>("users")
      .select(
        knex.ref("id").withSchema("projects"),
        knex.ref("name").withSchema("projects"),
        knex.ref("created_at").withSchema("projects"),
        knex.ref("updated_at").withSchema("projects"),
        knex.ref("user_id").withSchema("projects")
      )
      .join<ProjectSchema>("projects", "users.id", "projects.user_id")
      .where("projects.user_id", this.id)
      .orderBy('projects.created_at', 'desc');

    if (projects.length === 0) {
      return [];
    }

    const updatedProjects = projects.map((proj) => new Project(proj));
    this.projects = await Promise.all(updatedProjects.map(async (project) => {
      await project.getTasks();
      return project;
    }))
    return this.projects;
  }

  async createMessages() {
    const knex = getKnex();
    const messageIds = await knex<Message>('messages').select('id');
    const userMessages = messageIds.map(({ id }) => {
      return {
        user_id: this.id,
        message_id: id,
      }
    });
    await UserMessage.insert(userMessages);
  }

  async createReports() {
    const knex = getKnex();
    const reportIds = await knex<Report>('reports').select('id');
    const userReports = reportIds.map((({ id }) => {
      return {
        user_id: this.id,
        report_id: id
      }
    }));
    await UserReport.insert(userReports);
  }



  static async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  static async findById(id: number) {
    const knex = getKnex();
    const users = await knex<UserSchema>("users").select("*").where("id", id);
    if (users.length === 0) {
      return null;
    }
    const updatedUser = users[0];
    return new User(updatedUser);
  }

  static async deleteById(id: number) {
    const knex = getKnex();
    const users = await knex<UserSchema>("users").where("id", id).del("*");
    if (users.length === 0) {
      return null;
    }
    const deletedUser = users[0];
    return new User(deletedUser);
  }

  static async findOne(
    value: Partial<Omit<UserSchema, "created_at" | "updated_at" | "password">>
  ) {
    const knex = getKnex();
    const users = await knex<UserSchema>("users")
      .select("*")
      .where(value)
      .limit(1);
    if (!users[0]) {
      return null;
    }

    return new User(users[0]);
  }

  async confirmPassword(enteredPassword: string) {
    const isValid = await bcrypt.compare(enteredPassword, this.password);
    return isValid;
  }

  static async insertOne(
    value: Omit<UserSchema, "id" | "created_at" | "updated_at">
  ) {
    const knex = getKnex();
    value.password = await User.hashPassword(value.password);
    const users = await knex<UserSchema>("users").insert(value).returning("*");
    return new User(users[0]);
  }

  // Create a test user
  static async createTestUser() {
    const knex = getKnex();
    let user = (await knex<UserSchema>('users').where({ email: testUser.email }).select('*'))[0];
    if (!user) {
      // Create a test user if does not exist already
      user = (await knex<UserSchema>('users').insert(testUser).returning('*'))[0];
      // Create a project for the test user
      const project = (await knex<ProjectSchema>('projects').insert({name: 'Getting Started', user_id: user.id}, '*'))[0];
      // Create a task for the above project
      const task = (await knex<TaskSchema>('tasks').insert({name: 'Create Your Own Project!', description: 'Use Taskr to plan and organize your own project', tag: 'SETUP', status: 0, project_id: project.id, user_id: user.id}, 'id'))[0];
      //Add comments to the created tasks
      await knex<CommentSchema>('comments').insert([{task_id: task.id, user_id: user.id, message: "You can create your own project by navigating to the 'Project' page and pressing the 'Create Project' button!"}, {message: "You can change the status of your current task by pressing the icon next to 'Status'", user_id: user.id, task_id: task.id}]);
      
      const messages = data.messages.map(message => ({ user_id: user.id, message_id: message.id }));

      const reports = data.reports.map(report => ({ user_id: user.id, report_id: report.id }));
      // Insert messages
      await knex('user_reports').insert(reports);
      // Insert reports
      await knex('user_messages').insert(messages);
    }

    return new this(user);
  }

  static isTestUser(data: { email: string; password: string; }) {
    return data.email === testUser.email && data.password === testUser.password
  }

  toJSON() {
    const data = {
      id: this.id,
      name: this.name,
      email: this.email,
      created_at: this.created_at,
      updated_at: this.updated_at,
      projects: this.projects,
    };
    return data;
  }

}

export default User;
