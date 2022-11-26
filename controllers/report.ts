import {NextApiRequest, NextApiResponse} from 'next'; 
import {RequestHandler} from 'next-connect'
import User from '../models/User';
import UserReport from '../models/UserReport';
import {getQuery} from '../utils';
import Boom from '@hapi/boom';

interface ExtendedRequest extends NextApiRequest {
    user: User
}

export const find: RequestHandler<ExtendedRequest, NextApiResponse> = async (req, res) => {
    const userReports = await UserReport.find({user_id: req.user.id});
    res.json(userReports);
}

export const viewReport: RequestHandler<ExtendedRequest, NextApiResponse> = async (req, res) => {
    const id = getQuery(req.query.id);
    if(!id) {
        return res.status(400).json(Boom.badRequest('Message id must be provided'));
    }
    const report = await UserReport.findOne({id: parseInt(id), user_id: req.user.id});
    if(!report) {
        return res.status(400).json(Boom.notFound('User Message not found'));
    }
    await report.viewReport();
    res.json(report);
}