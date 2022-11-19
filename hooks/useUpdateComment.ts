import { useEffect } from "react";
import useRequest from "./useRequest";
import { sendRequest } from "../utils";
import {CommentSchema} from '../models/Comment';
import useTask from './useTask';
import useTasks from './useTasks';

interface Input {
    id: number,
    task_id: number,
    project_id: number,
    favorite?: boolean,
    like?: boolean
}

const updateComment = async ({id, ...input}: Input, token: string) => {
    const comment = await sendRequest<CommentSchema, Omit<Input, 'id'>>({url: `/api/comments/${id}`, method: 'PUT', body: input, token});
    return {
        ...comment,
        project_id: input.project_id
    }
};



const useUpdateComment = () => {
    const {sendRequest, data} = useRequest(updateComment);
    const {mutate} = useTask(data?.task_id.toString(), data?.project_id.toString());
    const {mutate: mutateTasks} = useTasks(data?.project_id.toString());

    useEffect(() => {
        if(data) {
            mutate(task => {
                if(!task) {
                    return;
                }
                const comments = [...task.comments];
                const commentIndex = comments.findIndex(comment => comment.id === data.id);
                if(commentIndex === -1) {
                    return task;
                }
                const {project_id, ...comment} = data;
                comments[commentIndex] = comment;
                return {
                    ...task,
                    comments
                }
            }, false);
            mutateTasks();
        }
    }, [data, mutate, mutateTasks]);
    
    return sendRequest;
}

export default useUpdateComment;

