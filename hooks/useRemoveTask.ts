import { useEffect } from "react";
import {useRouter} from 'next/router';
import { sendRequest } from "../utils";
import useRequest from "./useRequest";
import {Task} from './useAddTask';
import useTasks from './useTasks';

interface Input {
    taskId: number;
    projectId: number;
}


const removeTask = async (input: Input, token: string) => {
    const data = await sendRequest<Task, Input>({url: `/api/tasks/${input.taskId}?project_id=${input.projectId}`, method: 'DELETE', token});
    return data;
}

const useRemoveTask = () => {
    const {data: task, sendRequest} = useRequest(removeTask);
    const {mutate} = useTasks(task?.project_id.toString());
    const {push} = useRouter();

    useEffect(() => {
        if(task) { 
            mutate(prevTasks => {
                if(!prevTasks) {
                    return;
                }
                return prevTasks.filter(prevTask => prevTask.id !== task.id);
            }, false);
            push(`/dashboard/projects/${task.project_id}`)
        }
    }, [task, mutate, push])
    return sendRequest;
}

export default useRemoveTask;