import { NextApiRequest, NextApiResponse } from 'next';
import Boom from '@hapi/boom';

const notFound = (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(404).json(Boom.notFound('Method not Found'));
}

export default notFound;