import { useEffect } from "react";
import useRequest from "./useRequest";
import {sendRequest} from '../utils'
import { CommentSchema } from "../models/Comment";
import { Comment } from "../components/common/CommentCard";
import {TaskSchema} from '../models/Task';
import useTasks from './useTasks';
import useUI from "./useUI";

export interface Input extends Pick<TaskSchema, 'name'|'description'|'tag'|'status'|'project_id'> {
    comments: Comment[],
} 

export interface Task extends TaskSchema {
    comments: CommentSchema[]
}

const addTask = async (body: Input, token: string) => {
    const task = await sendRequest<Task, Input>({url: '/api/tasks', body, token});
    return task;
}

const useAddTask = () => {
    const {data: task, error, sendRequest} = useRequest(addTask);
    const {mutate} = useTasks(task?.project_id.toString());
    const {openToastHandler} = useUI();
    
    useEffect(() => {
        if(task) {
            mutate(prevTasks => [task, ...(prevTasks || [])], false);
            openToastHandler('success', 'Task Created');
        }
        if(error) {
            openToastHandler('error', error.message);
        }
    }, [task, mutate, openToastHandler, error])
    
    return sendRequest;
}

export default useAddTask;