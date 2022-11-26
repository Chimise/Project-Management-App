import { useEffect } from "react";
import useRequest from "./useRequest";
import { sendRequest } from "../utils";
import UserModel, { UserSchema } from "../models/User";
import useAuth from "./useAuth";
import useUI from "./useUI";
import useUser from './useUser';


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
  const { openToastHandler } = useUI();
  const {mutate} = useUser();
  useEffect(() => {
    if (data) {
      loginHandler(data.jwt);
      mutate(data.user, false);
    }
  }, [loginHandler, data, mutate]);

  useEffect(() => {
    if (error) {
      openToastHandler("error", error.message);
    }
  }, [error, openToastHandler]);

  return sendRequest;
};

export default useLogin;
