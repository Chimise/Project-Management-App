import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import error from "../middlewares/error";
import notFound from "../controllers/404";

const handler = () => {
    return nextConnect<NextApiRequest, NextApiResponse>({onError: error, onNoMatch: notFound});
}

export default handler;