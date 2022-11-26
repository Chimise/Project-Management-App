import {NextApiRequest, NextApiResponse} from 'next'; 
import {RequestHandler} from 'next-connect'
import User from '../models/User';
import UserMessage from '../models/UserMessage';
import {getQuery} from '../utils';
import Boom from '@hapi/boom';

interface ExtendedRequest extends NextApiRequest {
    user: User
}

export const find: RequestHandler<ExtendedRequest, NextApiResponse> = async (req, res) => {
    const userMessages = await UserMessage.find({user_id: req.user.id});
    res.json(userMessages);
}

export const viewMessage: RequestHandler<ExtendedRequest, NextApiResponse> = async (req, res) => {
    const id = getQuery(req.query.id);
    if(!id) {
        return res.status(400).json(Boom.badRequest('Message id must be provided'));
    }
    const message = await UserMessage.findOne({id: parseInt(id), user_id: req.user.id});
    if(!message) {
        return res.status(400).json(Boom.notFound('User Message not found'));
    }
    await message.viewMessage();
    res.json(message);
}