import { useEffect } from "react";
import useRequest from "./useRequest";
import { sendRequest } from "../utils";
import User, {UserSchema} from '../models/User';
import useAuth from './useAuth';

type Body = Pick<UserSchema, 'email'|'password'|'name'>
type Data = Pick<User, `${keyof Omit<UserSchema, 'password'>}`|'projects'>

type Auth = {
    user: Data,
    jwt: string;
}

const loginUser = async (input: Body) => {
    const data = await sendRequest<Auth, Body>({
        body: input,
        url: '/api/auth/signup',
    });
    
    return data;
}

const useSignup = () => {
    const {data, error, sendRequest} = useRequest(loginUser);
    const {loginHandler, token} = useAuth();

    useEffect(() => {
        if(data) {
            console.log(data);
            loginHandler(data.jwt);
        }
        if(error) {
            console.log(error);
        }
    }, [loginHandler, data, error]);


    return sendRequest;
}

export default useSignup;