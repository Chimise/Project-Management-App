import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "next-connect";
import * as yup from "yup";
import User from "../models/User";
import Task from "../models/Task";
import Comment from "../models/Comment";
import Boom from "@hapi/boom";
import { getQuery, Status } from "../utils";


interface ExtendedRequest extends NextApiRequest {
  user: User;
}

const taskUpdateSchema = yup.object({
  name: yup.string(),
  tag: yup.string(),
  description: yup.string(),
  status: yup.number().oneOf([0, 1, 2]),
  project_id: yup.number().required()
});

const taskCreateSchema = yup.object({
    name: yup.string().required("Name is required"),
    tag: yup.string().required("Tag is required"),
    description: yup.string().required("Description is required"),
    status: yup.number().oneOf([0, 1, 2]).required("Status is required"),
    project_id: yup.number().required("Project id is required"),
    comments: yup.array(yup.object({
      message: yup.string().required("Comment tag is required"),
      like: yup.boolean().required("Like comment field is required"),
      favorite: yup.boolean().required('favorite comment field is required'),
      created_at: yup.string().required('Created_at comment field is required')
    })).required("Comments field is required")
});

export const findOne: RequestHandler<ExtendedRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  const id = parseInt(getQuery(req.query.id)!);
  const project_id = getQuery(req.query.project_id);

  if (!project_id) {
    return res.status(400).json(Boom.badRequest("Please provide a project id"));
  }

  try {
    const task = await Task.findOne({
      id,
      user_id: req.user.id,
      project_id: parseInt(project_id),
    });

    if (!task) {
      return res.status(404).json(Boom.notFound("Task not found"));
    }
    await task.getComments();
    return res.json(task);
  } catch (error) {
    return next(error);
  }
};

export const find: RequestHandler<ExtendedRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  try {
    const project_id = getQuery(req.query.project_id);
    if (!project_id) {
      return res
        .status(400)
        .json(Boom.badRequest("Please provide a project id"));
    }
    const tasks = await Task.find({
      project_id: parseInt(project_id),
      user_id: req.user.id,
    });
    await Promise.all(tasks.map(task => {
      return task.getComments();
    }))
    res.json(tasks);
  } catch (error) {
    return next(error);
  }
};

export const updateOne: RequestHandler<
  ExtendedRequest,
  NextApiResponse
> = async (req, res, next) => {
  const id = parseInt(getQuery(req.query.id)!);
  try {
    const { name, tag, description, status, project_id } = await taskUpdateSchema.validate(
      req.body
    );
    const task = await Task.findOne({
      id,
      project_id,
      user_id: req.user.id,
    });
    if (!task) {
      return res.status(400).json(Boom.badRequest("Task not found"));
    }
    
    if (name) {
      task.name = name;
    }
    if (tag) {
      task.tag = tag;
    }
    if (description) {
      task.description = description;
    }
    if (status) {
      task.status = status as Status;
    }
    await task.save();
    return res.json(task);
  } catch (error) {
    return next(error);
  }
};

export const create: RequestHandler<ExtendedRequest, NextApiResponse> = async (req, res, next) => {
    try {
        const {name, tag, description, status, project_id, comments} = await taskCreateSchema.validate(req.body, {stripUnknown: true});
        const task = await Task.insertOne({name, tag, description, status, project_id, user_id: req.user.id});
        if(comments.length !== 0) {
          await task.insertComments(comments);
        }
        
        res.status(201).json(task);
    } catch (error) {
      console.log(error);
        next(error);
    }
}

export const deleteOne: RequestHandler<ExtendedRequest, NextApiResponse> = async (req, res, next) => {
    const id = parseInt(getQuery(req.query.id)!);
    const project_id = getQuery(req.query.project_id);
    if(!project_id) {
        return res.status(400).json(Boom.badRequest("Please provide a project id"));
    }
    const task = await Task.deleteOne({id, user_id: req.user.id, project_id: parseInt(project_id)});
    if(!task) {
        return res.status(404).json(Boom.notFound("Task was not found"));
    }
    res.json(task);
}