import { getKnex } from "../utils/connectDb";
import { BaseSchema } from "../utils";
import Comment, { CommentSchema } from "./Comment";

export interface TaskSchema extends BaseSchema {
  name: string;
  tag: string;
  description: string;
  status: number;
  project_id: number;
  user_id: number;
}

class Task {
  id: number;
  name: string;
  tag: string;
  description: string;
  status: number;
  created_at: string;
  updated_at: string;
  project_id: number;
  user_id: number;
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
    user_id,
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
    this.user_id = user_id;
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
      .select("comments.*")
      .join<CommentSchema>("comments", "tasks.id", "comments.task_id")
      .where("comments.task_id", this.id)
      .orderBy('comments.created_at','desc');
    if (comments.length === 0) {
      return [];
    }

    this.comments = comments.map((comment) => new Comment(comment));
    return this.comments;
  }
  async getComment(commentId: number) {
    const knex = getKnex();
    const comment: CommentSchema = (
      await knex<TaskSchema>("tasks")
        .select("comments.*")
        .join<CommentSchema>("comments", "tasks.id", "comments.task_id")
        .where("comments.id", commentId)
        .andWhere("comments.task_id", this.id)
    )[0];
    if (!comment) {
      return null;
    }
    return new Comment(comment);
  }

  async insertComments(values: Omit<CommentSchema, 'id'|'updated_at'|'task_id'|'user_id'>[]) {
    const updatedValues = values.map(val => ({...val, task_id: this.id, user_id: this.user_id}));
    const knex = getKnex();
    await knex('comments').insert(updatedValues);
    this.comments = await this.getComments();
  }

  static async findById(id: number) {
    const knex = getKnex();
    const task = (
      await knex<TaskSchema>("tasks").select("*").where("id", id)
    )[0];
    if (!task) {
      return null;
    }

    const updatedTask =  new Task(task);
    await updatedTask.getComments();
    return updatedTask;
  }

  static async findOne(
    values: Partial<Omit<TaskSchema, "created_at" | "updated_at">>
  ) {
    const knex = getKnex();
    const task = (
      await knex<TaskSchema>("tasks").select("*").where(values).limit(1)
    )[0];
    if (!task) {
      return null;
    }
    const populatedTask =  new Task(task);
    await populatedTask.getComments();
    return populatedTask;
  }

  static async find(values: Partial<Omit<TaskSchema, keyof BaseSchema>>) {
    const knex = getKnex();
    const tasks = await knex<TaskSchema>("tasks").select("*").where(values);
    if (tasks.length === 0) {
      return [];
    }
    const populatedTask =  await Promise.all(tasks.map(async (task) => {
      const newTask = new Task(task);
      await newTask.getComments();
      return newTask;
    }));
    return populatedTask;
  }

  static async insertOne(data: Omit<TaskSchema, keyof BaseSchema>) {
    const knex = getKnex();
    const task = (await knex<TaskSchema>("tasks").insert(data, "*"))[0];
    return new Task(task);
  }

  static async deleteOne(
    values: Partial<Omit<TaskSchema, "created_at" | "updated_at">>
  ) {
    const knex = getKnex();
    const task = (
      await knex<TaskSchema>("tasks").where(values).del("*").limit(1)
    )[0];
    if (!task) {
      return null;
    }
    
    return new Task(task);
  }

  toJSON() {
    const { id, name, tag, status, description, project_id, comments, created_at, updated_at } =
      this;
    return {
      id,
      name,
      tag,
      description,
      project_id,
      created_at,
      updated_at,
      comments,
      status: typeof status == 'string' ? parseInt(status) : status
    };
  }
  
}

export default Task;
