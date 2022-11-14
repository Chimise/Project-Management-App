import bcrypt from "bcryptjs";
import { getKnex } from "../utils/connectDb";
import type { BaseSchema } from "../utils";
import Project, { ProjectSchema } from "./Project";

interface UserSchema extends BaseSchema {
  name: string;
  email: string;
  password: string;
}

// type InsertUser = Pick<User, 'name'|'email'|'password'> & Partial<Pick<User, 'created_at' | 'updated_at'>>

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

    await knex<UserSchema>("users")
      .update({
        name: this.name,
        password: this.password,
        updated_at: knex.fn.now(),
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
      .where("user_id", this.id);

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

  toString() {
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
