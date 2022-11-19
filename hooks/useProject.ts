import useSWR from "swr";
import useAuth from "./useAuth";
import { ProjectSchema } from "../models/Project";
import RequestError from '../utils/RequestError';


const useProject = (id?: string) => {
    const {token} = useAuth();
    const {data: project, error, mutate} = useSWR<ProjectSchema, RequestError>(token && id && [`/api/projects/${id}`, token]);

    return {
        project,
        error: project ? undefined : error,
        mutate,
        isLoading: !project && !error
    }
}

export default useProject;