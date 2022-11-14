import {RequestHandler} from 'next-connect';
import {NextApiRequest, NextApiResponse } from 'next';
import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { NEXT_BUILTIN_DOCUMENT } from 'next/dist/shared/lib/constants';

interface ApiRequest extends NextApiRequest {
    user: User
}

const isAuth: RequestHandler<ApiRequest, NextApiResponse> = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) {
        return res.status(401).json(Boom.unauthorized('Invalid Data'));
    }
    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET!) as {id: number};
        const user = await User.findById(id);
        if(!user) {
            return res.status(401).json(Boom.unauthorized('User not found'));
        }
        req.user = user;
        next()
    } catch (error) {
        return next(error);
    }
    

}

export default isAuth;

