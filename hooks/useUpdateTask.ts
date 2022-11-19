import { useEffect } from "react";
import { sendRequest } from "../utils";
import useRequest from "./useRequest";
import useTasks from "./useTasks";
import type { TaskSchema } from "../models/Task";
import type {Task} from './useAddTask';
import useUI from './useUI';

type Input = Omit<TaskSchema, 'created_at'|'updated_at'|'user_id'>;

const updateTask = async ({id, ...input}: Input, token: string) => {
    const data = await sendRequest<Task, Omit<Input, 'id'>>({url: `/api/tasks/${id}`, method: 'PUT', body: input, token});
    return data;
}

const useUpdateTask = () => {
 const {sendRequest, data, error} = useRequest(updateTask);
 const {mutate} = useTasks(data?.id.toString());
 const {openToastHandler} = useUI();
useEffect(() => {
    if(data) {
        mutate(tasks => {
            if(!tasks) {
                return;
            }
            const updatedTasks = [...tasks];
            const taskId = updatedTasks.findIndex(task => task.id === data.id);
            if(taskId === -1) {
                return updatedTasks;
            }
            updatedTasks[taskId] = data;
            return updatedTasks;
        }, false);
        openToastHandler('success', 'Task Updated');
    }

    if(error) {
        openToastHandler('error', error.message);
    }
}, [mutate, data, error, openToastHandler]);

 return sendRequest;
}

export default useUpdateTask;