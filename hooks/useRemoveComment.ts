import { useEffect } from "react";
import useRequest from "./useRequest";
import { sendRequest } from "../utils";
import {CommentSchema} from '../models/Comment';
import useTask from './useTask';
import useTasks from './useTasks';

interface Input {
    id: number,
    taskId: number,
    projectId: number
}

const removeComment = async ({id, taskId, projectId}: Input, token: string) => {
    const comment = await sendRequest<CommentSchema, any>({url: `/api/comments/${id}?task_id=${taskId}&project_id=${projectId}`, method: 'DELETE', token});
    return {
        ...comment,
        project_id: projectId
    }
}

const useRemoveComment = () => {
    const {data: comment, sendRequest} = useRequest(removeComment);
    const {mutate} = useTask(comment?.task_id.toString(), comment?.project_id.toString());
    const {mutate: mutateTasks} = useTasks(comment?.project_id.toString());

    useEffect(() => {
        if(comment) {
            mutate(task => {
                if(!task) {
                    return;
                }
                return {
                    ...task,
                    comments: task.comments.filter(comt => comt.id !== comment.id)
                }
            }, false);
            mutateTasks();
        }
    }, [comment, mutate, mutateTasks]);
    return sendRequest;
}

export default useRemoveComment;