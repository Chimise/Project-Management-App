import { getKnex } from "../utils/connectDb";
import { BaseSchema, Status } from "../utils";
import Comment, { CommentSchema } from "./Comment";

export interface TaskSchema extends BaseSchema {
  name: string;
  tag: string;
  description: string;
  status: Status;
  project_id: number;
}

class Task {
  id: number;
  name: string;
  tag: string;
  description: string;
  status: Status;
  created_at: string;
  updated_at: string;
  project_id: number;
  comments: Comment[];

  constructor({
    id,
    name,
    tag,
    description,
    status,
    created_at,
    updated_at,
    project_id,
  }: TaskSchema) {
    this.id = id;
    this.name = name;
    this.tag = tag;
    this.description = description;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.project_id = project_id;
    this.comments = [];
  }

  async save() {
    const knex = getKnex();
    await knex<TaskSchema>("tasks")
      .update({
        name: this.name,
        tag: this.tag,
        description: this.description,
        status: this.status,
        updated_at: knex.fn.now(),
      })
      .where("id", this.id);
  }

  async getComments() {
    const knex = getKnex();
    const comments: CommentSchema[] = await knex<TaskSchema>("tasks")
      .select('comments.*')
      .join<CommentSchema>("comments", "tasks.id", "comments.task_id")
      .where('comments.task_id', this.id);
    if(comments.length === 0) {
        return [];
    }
    
    this.comments = comments.map(comment => new Comment(comment));
    return this.comments;
  }

  static async findById(id: number) {
    const knex = getKnex();
    const task = (
      await knex<TaskSchema>("tasks").select("*").where("id", id)
    )[0];
    if (!task) {
      return null;
    }
    return new Task(task);
  }

  static async findOne(
    values: Partial<
      Omit<TaskSchema, "created_at" | "updated_at" | "project_id">
    >
  ) {
    const knex = getKnex();
    const task = (await knex<TaskSchema>("tasks").select("*").where(values))[0];
    if (!task) {
      return null;
    }
    return new Task(task);
  }

  static async insertOne(data: Omit<TaskSchema, keyof BaseSchema>) {
    const knex = getKnex();
    const task = (await knex<TaskSchema>("tasks").insert(data, "*"))[0];
    return new Task(task);
  }

  static async deleteById(id: number) {
    const knex = getKnex();
    const task = (await knex<TaskSchema>("tasks").where("id", id).del("*"))[0];
    if (!task) {
      return null;
    }

    return new Task(task);
  }

  toString() {
    const { id, name, tag, description, project_id, created_at, updated_at } =
      this;
    return {
      id,
      name,
      tag,
      description,
      project_id,
      created_at,
      updated_at,
    };
  }
}

export default Task;
