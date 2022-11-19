import { useEffect } from "react";
import useRequest from "./useRequest";
import { sendRequest } from "../utils";
import UserModel, { UserSchema } from "../models/User";
import useAuth from "./useAuth";
import useUI from './useUI';

type Body = Pick<UserSchema, "email" | "password">;
export type User = Pick<
  UserModel,
  `${keyof Omit<UserSchema, "password">}` | "projects"
>;

type Auth = {
  user: User;
  jwt: string;
};

const loginUser = async (input: Body) => {
  const data = await sendRequest<Auth, Body>({
    body: input,
    url: "/api/auth/login",
  });

  return data;
};

const useLogin = () => {
  const { data, error, sendRequest } = useRequest(loginUser);
  const { loginHandler, token } = useAuth();
  const {openToastHandler} = useUI();
  useEffect(() => {
    if (data) {
      console.log(data);
      loginHandler(data.jwt);
    }
    if (error) {
      openToastHandler('error', error.message);
    }
  }, [loginHandler, data, error, openToastHandler]);


  return sendRequest;
};

export default useLogin;
