import { getKnex } from "../utils/connectDb";
import { BaseSchema } from "../utils";

export interface CommentSchema extends BaseSchema {
  message: string;
  favorite: boolean;
  like: boolean;
  task_id: number;
  user_id: number;
}

class Comment {
  id: number;
  message: string;
  favorite: boolean;
  like: boolean;
  created_at: string;
  updated_at: string;
  task_id: number;
  user_id: number;
  constructor({
    id,
    message,
    favorite,
    like,
    created_at,
    updated_at,
    task_id,
    user_id,
  }: CommentSchema) {
    this.id = id;
    this.message = message;
    this.favorite = favorite;
    this.like = like;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.task_id = task_id;
    this.user_id = user_id;
  }

  async save() {
    const knex = getKnex();
    const updated_at = knex.fn.now();

    await knex<CommentSchema>("comments").update({
      message: this.message,
      favorite: this.favorite,
      like: this.like,
      updated_at,
    });
  }

  static async findById(id: number) {
    const knex = getKnex();
    const comment = (
      await knex<CommentSchema>("comments").select("*").where("id", id)
    )[0];
    if (!comment) {
      return null;
    }
    return new Comment(comment);
  }

  static async findOne(values: Partial<Omit<CommentSchema, 'created_at'|'updated_at'>>) {
    const knex = getKnex();
    const comment = (
      await knex<CommentSchema>("comments").select("*").where(values).limit(1)
    )[0];
    if (!comment) {
      return null;
    }
    return new Comment(comment);
  }

  static async insertOne(data: Omit<CommentSchema, keyof BaseSchema>) {
    const knex = getKnex();
    const comment = (
      await knex<CommentSchema>("comments").insert(data, "*")
    )[0];
    return new Comment(comment);
  }

  static async deleteOne(values: Partial<Omit<CommentSchema, 'created_at'|'updated_at'>>) {
    const knex = getKnex();
    const comment = (
      await knex<CommentSchema>("comments").where(values).del("*").limit(1)
    )[0];
    if(!comment) {
      return null;
    }
    return new Comment(comment);
  }

  toJSON() {
    const { id, message, like, favorite, task_id, created_at, updated_at } =
      this;
    return {
      id,
      message,
      like,
      favorite,
      task_id,
      created_at,
      updated_at,
    };
  }

}

export default Comment;
