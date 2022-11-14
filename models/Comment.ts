import { getKnex } from "../utils/connectDb";
import { BaseSchema } from "../utils";

export interface CommentSchema extends BaseSchema {
  message: string;
  favorite: boolean;
  like: boolean;
  task_id: number;
}

type CommentField = Omit<CommentSchema, keyof BaseSchema>;

type CommentUpdate = {
  [Key in keyof CommentField]+?: boolean;
};

class Comment {
  id: number;
  message: string;
  favorite: boolean;
  like: boolean;
  created_at: string;
  updated_at: string;
  task_id: number;
  constructor({
    id,
    message,
    favorite,
    like,
    created_at,
    updated_at,
    task_id,
  }: CommentSchema) {
    this.id = id;
    this.message = message;
    this.favorite = favorite;
    this.like = like;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.task_id = task_id;
  }

  async save(updateFields?: CommentUpdate) {
    const knex = getKnex();
    const update = {} as CommentField;
    const updated_at = knex.fn.now();

    if (!updateFields) {
      await knex<CommentSchema>("comments").update({
        message: this.message,
        favorite: this.favorite,
        like: this.like,
        updated_at
      });
      return;
    }

    Object.keys(updateFields).forEach((key) => {
      const value = updateFields[key as keyof CommentUpdate];
      if (value) {
        //@ts-ignore
        update[key as keyof CommentField] =
          this[key as keyof CommentUpdate];
      }
    });
    await knex<CommentSchema>("comments")
      .update({...update, updated_at})
      .where("id", this.id)
      .returning("*");
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

  static async findOne(values: Partial<Omit<CommentSchema, keyof BaseSchema>>) {
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

  static async deleteById(id: number) {
    const knex = getKnex();
    const comment = (
      await knex<CommentSchema>("comments").where("id", id).del("*")
    )[0];
    return new Comment(comment);
  }

  toString() {
    const {id, message, like, favorite, task_id, created_at, updated_at} = this;
    return {
        id,
        message,
        like,
        favorite,
        task_id,
        created_at,
        updated_at
    }
  }
}

export default Comment;
