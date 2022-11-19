import {ErrorHandler} from 'next-connect'
import {NextApiRequest, NextApiResponse} from 'next';
import * as yup from 'yup';
import Boom from '@hapi/boom';

const error: ErrorHandler<NextApiRequest, NextApiResponse> = (error, req, res, next) => {
    if (error instanceof yup.ValidationError) {
        return res.status(404).json(Boom.badRequest(error.errors[0], {field: error.path}));
    }
    return res.status(500).json(Boom.badImplementation(error.message || "An error occurred"));
}

export default error;