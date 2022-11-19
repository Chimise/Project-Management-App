import useSWR from "swr";
import useAuth from "./useAuth";
import { Task } from "./useAddTask";
import RequestError from "../utils/RequestError";

const useTasks = (projectId?: string) => {
    const {token} = useAuth();
    const {data: tasks, error, mutate} = useSWR<Task[], RequestError>(token && projectId && [`/api/tasks?project_id=${projectId}`, token]);
    return {
        tasks,
        error: tasks ? undefined : error,
        mutate,
        completed: !tasks ? undefined : tasks.filter(task => task?.status === 2),
        progress: !tasks ? undefined : tasks.filter(task => task?.status ===1),
        created: !tasks ? undefined : tasks.filter(task => task?.status === 0)
    }
}

export default useTasks;