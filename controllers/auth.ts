import {NextApiRequest, NextApiResponse} from 'next'; 
import {RequestHandler} from 'next-connect'
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import User from '../models/User';
import Boom from '@hapi/boom';

const loginSchema = yup.object({
    name: yup.string().required("Enter your user name"),
    email: yup.string().email("Enter a valid email address").required('Your email is required'),
    password: yup.string().trim().min(5, 'Your password should be at least 5 characters').required("Enter your password")
});

const signUpSchema = yup.object({
    email: yup.string().email("Enter a valid email address").required('Your email is required'),
    password: yup.string().trim().min(5, "Your password should be at least 5 characters").required('Enter your password')
})

export const signUp: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
    try {
        const body = await loginSchema.validate(req.body);
        const user = await User.findOne({email: body.email});
        if(user) {
            return res.status(400).json(Boom.badRequest("A user with this email already exist"));
        }

        const newUser = await User.insertOne({name: body.name, email: body.email, password: body.password});
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET!, {expiresIn: '24h'});
        res.status(201).json({user: newUser, jwt: token});
    } catch (error) {
        return next(error);
    }

}

export const logIn: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
    try {
        const body = await signUpSchema.validate(req.body);
        const user = await User.findOne({email: body.email});
        if(!user) {
            return res.status(401).json(Boom.unauthorized("Invalid Credentials"));
        }

        if(!await user.confirmPassword(body.password)) {
            return res.status(401).json(Boom.unauthorized('Invalid Credentials'));
        }
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: '24h'});
        res.json({user, jwt: token});

    } catch (error) {
        return next(error);
    }
}