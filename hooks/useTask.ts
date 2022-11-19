import useSWR from "swr";
import useAuth from "./useAuth";
import { Task } from "./useAddTask";
import RequestError from "../utils/RequestError";

const useTask = (id?: string, projectId?: string) => {
    const {token} = useAuth();
    
    const {data: task, error, mutate} = useSWR<Task, RequestError>(id && token && projectId && [`/api/tasks/${id}?project_id=${projectId}`, token]);
    return {
        task,
        error: task ? undefined : error,
        mutate,
        isLoading: !error && !task
    }
}

export default useTask;