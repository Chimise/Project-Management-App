import useSWR from "swr";
import useAuth from "./useAuth";
import {User} from './useLogin';
import RequestError from "../utils/RequestError";

const useUser = () => {
    const {token} = useAuth();
    const {data: user, error, mutate} = useSWR<User, RequestError>(token && ['/api/users/me', token]);
    const firstName = user ? user.name.split(' ')[1] || user.name.split(' ')[0] : undefined;
    return {
        user,
        error,
        mutate,
        firstName
    }
}

export default useUser;
