import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "next-connect";
import * as yup from "yup";
import User from "../models/User";
import Boom from "@hapi/boom";
import { getQuery } from "../utils";

export interface ExtendedRequest extends NextApiRequest {
  user: User;
}

const updateUserSchema = yup.object({
  name: yup.string().optional(),
  password: yup
    .string()
    .trim()
    .min(5, "Your password should be at least 5 characters")
    .optional(),
});

export const currentUser: RequestHandler<ExtendedRequest, NextApiResponse> = (
  req,
  res
) => {
  return res.json(req.user);
};

export const deleteOne: RequestHandler<NextApiRequest, NextApiResponse> = async (
  req,
  res
) => {
  const id = getQuery(req.query.id);
  const user = await User.deleteById(parseInt(id!));
  if (!user) {
    return res.status(404).json(Boom.notFound("User not found"));
  }

  res.json(user);
};

export const updateOne: RequestHandler<
  ExtendedRequest,
  NextApiResponse
> = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, password } = await updateUserSchema.validate(req.body);
    if (name) {
      user.name = name;
    }

    if (password) {
      user._password = password;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    return next(error);
  }
};
