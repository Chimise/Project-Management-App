import { getKnex } from "../utils/connectDb";
import { BaseSchema } from "../utils";
import Task, { TaskSchema } from "./Task";

export interface ProjectSchema extends BaseSchema {
  name: string;
  user_id: number;
}

class Project {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  tasks: Task[];
  constructor({ id, name, created_at, updated_at, user_id }: ProjectSchema) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user_id = user_id;
    this.tasks = [];
  }

  async save() {
    const knex = getKnex();
    await knex<ProjectSchema>("projects")
      .update({ name: this.name, updated_at: knex.fn.now() })
      .where("id", this.id);
  }

  

  static async findById(id: number) {
    const knex = getKnex();
    const projects = await knex<ProjectSchema>("projects")
      .select("*")
      .where("id", id);
    if (projects.length === 0) {
      return null;
    }

    return new Project(projects[0]);
  }

  async getTasks() {
    const knex = getKnex();
    const tasks: TaskSchema[] = await knex<ProjectSchema>("projects")
      .select("tasks.*")
      .join<TaskSchema>("tasks", "projects.id", "tasks.project_id")
      .where("tasks.project_id", this.id);
    if (tasks.length === 0) {
      return [];
    }
    const allTasks = tasks.map((task) => new Task(task));
    this.tasks = await Promise.all(
      allTasks.map(async (task) => {
        await task.getComments();
        return task;
      })
    );
    return this.tasks;

  }

  static async findOne(values: Partial<Omit<ProjectSchema, keyof ProjectSchema>>) {
    const knex = getKnex();
    const projects = await knex<ProjectSchema>("projects")
      .select("*")
      .where(values)
      .limit(1);
    if (projects.length === 0) {
      return null;
    }
    return new Project(projects[0]);
  }

  static async find(values: Partial<Omit<ProjectSchema, keyof BaseSchema>>) {
    const knex = getKnex();
    const projects = await knex<ProjectSchema>('projects').select('*').where(values);
    if(projects.length === 0) {
        return []
    }
    return projects.map(proj => new Project(proj));
  }

  static async insertOne(values: Pick<ProjectSchema, "name" | "user_id">) {
    const knex = getKnex();
    const projects = await knex<ProjectSchema>("projects")
      .insert(values)
      .returning("*");
    return new Project(projects[0]);
  }

  static async deleteById(id: number) {
    const knex = getKnex();
    const projects = await knex<ProjectSchema>("projects")
      .where("id", id)
      .del("*");
    if (projects.length === 0) {
      return null;
    }
    return new Project(projects[0]);
  }

  toString() {
    const { id, name, user_id, created_at, updated_at, tasks } = this;
    return {
      id,
      name,
      user_id,
      created_at,
      updated_at,
      tasks,
    };
  }
}

export default Project;
