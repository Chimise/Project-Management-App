import {NextApiRequest, NextApiResponse} from 'next'; 
import {RequestHandler} from 'next-connect'
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Boom from '@hapi/boom';
import { logInSchema, signUpSchema } from '../utils/validate';


export const signUp: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
    try {
        const body = await signUpSchema.validate(req.body);
        const user = await User.findOne({email: body.email});
        if(user) {
            return res.status(400).json(Boom.badRequest("A user with this email already exist"));
        }

        const newUser = await User.insertOne({name: body.name, email: body.email, password: body.password});
        await newUser.createMessages();
        await newUser.createReports();
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET!, {expiresIn: '24h'});
        res.status(201).json({user: newUser, jwt: token});
    } catch (error) {
        return next(error);
    }

}

export const logIn: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
    try {
        const body = await logInSchema.validate(req.body);

        // If the email and password is that of a test user, login the test user;
        if(User.isTestUser(body)) {
            const user = await User.createTestUser();
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: '24h'});
            return res.json({user, jwt: token});
        }

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