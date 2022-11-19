import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "next-connect";
import * as yup from "yup";
import User from "../models/User";
import Project from "../models/Project";
import Boom from "@hapi/boom";
import {getQuery} from '../utils';

interface ExtendedRequest extends NextApiRequest {
  user: User;
}

const projectSchema = yup.object({
    name: yup.string().required('Project Name is required')
})

export const find: RequestHandler<ExtendedRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  try {
    const user = req.user;
    const projects = await user.getProjects();
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const findOne: RequestHandler<ExtendedRequest, NextApiResponse> = async (req, res, next) => {
    try {
        const id = parseInt(getQuery(req.query.id)!);
        const project = await Project.findOne({id, user_id: req.user.id});
        if(!project) {
            return res.status(404).json(Boom.notFound("Project not found"));
        }
        return res.json(project);
    } catch (error) {
        next(error);
    }
}

export const create: RequestHandler<ExtendedRequest, NextApiResponse> = async (req, res, next) => {
    try {
        const {name} = await projectSchema.validate(req.body);
        const project = await Project.insertOne({name, user_id: req.user.id});
        res.status(201).json(project);

    } catch (error) {
        return next(error);
    }
}

export const deleteOne: RequestHandler<ExtendedRequest, NextApiResponse> = async (req, res, next) => {
    try {
      const id = parseInt(getQuery(req.query.id)!);
      const project = await Project.deleteOne({id, user_id: req.user.id});
      if(!project) {
        return res.status(404).json(Boom.notFound("Project not found"));
      }
      return res.json(project);
    } catch (error) {
      
        return next(error);
    }
}


