import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "next-connect";
import * as yup from "yup";
import User from "../models/User";
import Boom from "@hapi/boom";
import Task from "../models/Task";
import Comment from "../models/Comment";

const idSchema = yup.number().required("Comment id is required");

const querySchema = yup.object({
  project_id: yup.number().required("Project Id is required"),
  task_id: yup.number().required("Task id is required"),
});

const commentCreateSchema = yup.object({
  task_id: yup.number().required("Task Id is required"),
  project_id: yup.number().required("Project Id is required"),
  favorite: yup.boolean().default(false),
  like: yup.boolean().default(false),
  message: yup.string().required("Message field is required"),
});

const commentUpdateSchema = yup.object({
  task_id: yup.number().required("Task Id is required"),
  project_id: yup.number().required("Project Id is required"),
  favorite: yup.boolean().optional(),
  like: yup.boolean().optional(),
  message: yup.string().optional(),
});

interface ExtendedRequest extends NextApiRequest {
  user: User;
}

export const findOne: RequestHandler<ExtendedRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  try {
    const id = await idSchema.validate(req.query.id);
    const { project_id, task_id } = await querySchema.validate(req.query);
    const task = await Task.findOne({
      id: task_id,
      project_id,
      user_id: req.user.id,
    });
    if (!task) {
      return res.status(404).json(Boom.notFound("Task not found"));
    }
    const comment = await task.getComment(id);
    if (!comment) {
      return res.status(404).json(Boom.notFound("Comment not found"));
    }
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

export const find: RequestHandler<ExtendedRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  try {
    const { project_id, task_id } = await querySchema.validate(req.query);
    const task = await Task.findOne({
      id: task_id,
      project_id,
      user_id: req.user.id,
    });
    if (!task) {
      return res.status(404).json(Boom.notFound("Task not found"));
    }
    const comments = await task.getComments();
    res.json(comments);
  } catch (error) {
    return next(error);
  }
};

export const create: RequestHandler<ExtendedRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  try {
    const { project_id, task_id, favorite, message, like } =
      await commentCreateSchema.validate(req.body);
    const task = await Task.findOne({
      project_id,
      id: task_id,
      user_id: req.user.id,
    });
    if (!task) {
      return res.status(404).json(Boom.notFound("Task not found"));
    }
    const comment = await Comment.insertOne({
      task_id,
      favorite,
      message,
      like,
      user_id: req.user.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    return next(error);
  }
};

export const updateOne: RequestHandler<
  ExtendedRequest,
  NextApiResponse
> = async (req, res, next) => {
  try {
    const id = await idSchema.validate(req.query.id);
    const { message, task_id, project_id, favorite, like } =
      await commentUpdateSchema.validate(req.body);
    const task = await Task.findOne({
      id: task_id,
      project_id,
      user_id: req.user.id,
    });
    if (!task) {
      return res.status(404).json(Boom.notFound("Task not found"));
    }

    const comment = await Comment.findOne({ task_id, id });
    if (!comment) {
      return res.status(404).json(Boom.notFound("Comment not found"));
    }
    if(favorite !== undefined) {
      comment.favorite = favorite;
    }
    if (message !== undefined) {
      comment.message = message;
    }
    if (like !== undefined) {
      comment.like = like;
    }

    await comment.save();
    return res.json(comment);
  } catch (error) {
    return next(error);
  }
};

export const deleteOne: RequestHandler<
  ExtendedRequest,
  NextApiResponse
> = async (req, res, next) => {
  try {
    const id = await idSchema.validate(req.query.id);
    const { project_id, task_id } = await querySchema.validate(req.query);
    const task = await Task.findOne({
      id: task_id,
      project_id,
      user_id: req.user.id,
    });
    if (!task) {
      return res.status(404).json(Boom.notFound("Task not found"));
    }
    const comment = await Comment.deleteOne({task_id, id});
    if(!comment) {
        return res.status(404).json(Boom.notFound('Comment not found'));
    }
    res.json(comment);
  } catch (error) {
    return next(error);
  }
};
