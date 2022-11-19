import useSWR from "swr";
import useAuth from './useAuth';
import { ProjectSchema } from "../models/Project";
import RequestError from "../utils/RequestError";

const useProjects = () => {
    const {token} = useAuth();
    const {data: projects, error, mutate} = useSWR<ProjectSchema[], RequestError>(token && ['/api/projects', token]);
    return {
        projects,
        error: projects ? undefined : error,
        mutate,
        isLoading: !projects && !error
    }
}

export default useProjects;