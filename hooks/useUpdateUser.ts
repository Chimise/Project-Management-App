import { useEffect } from "react";
import { sendRequest } from "../utils";
import useRequest from "./useRequest";
import { User } from "./useLogin";
import useUser from "./useUser";
import useUI from "./useUI";

type Input = {
  name?: string;
  password?: string;
};

const updateUser = async (input: Input, token: string) => {
  const user = await sendRequest<User, Input>({
    url: "/api/users",
    method: "PUT",
    body: input,
    token,
  });
  return user;
};

const useUpdateUser = () => {
  const { openToastHandler } = useUI();
  const { mutate } = useUser();
  const { data: user, error, sendRequest } = useRequest(updateUser);

  useEffect(() => {
    if (user) {
      mutate(user, false);
      openToastHandler('success', 'Your profile was sucessfully updated');
    }
  }, [openToastHandler, user, mutate]);

  useEffect(() => {
    if(error) {
        openToastHandler('error', error.message);
    }

  }, [openToastHandler, error]);

  return sendRequest;
};

export default useUpdateUser;
