import { useEffect } from "react";
import useRequest from "./useRequest";
import { sendRequest } from "../utils";
import User, {UserSchema} from '../models/User';
import useAuth from './useAuth';
import useUI from './useUI';
import useUser from './useUser';

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
    const {loginHandler} = useAuth();
    const {openToastHandler} = useUI();
    const {mutate} = useUser();

    useEffect(() => {
        if(data) {
            loginHandler(data.jwt);
        }
        
    }, [loginHandler, data, mutate]);

    useEffect(() => {
        if(error) {
            openToastHandler('error', error.message);
        }
    }, [error, openToastHandler])


    return sendRequest;
}

export default useSignup;