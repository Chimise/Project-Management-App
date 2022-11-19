import { useEffect } from "react";
import useRequest from "./useRequest";
import { sendRequest } from "../utils";
import { CommentSchema } from "../models/Comment";
import { Comment } from "../components/common/CommentCard";
import useTask from './useTask';
import useTasks from './useTasks';


interface CommentInput extends Comment {
    task_id: number;
    project_id: number;
}


const addComment = async (input: CommentInput, token: string) => {
    const comment = await sendRequest<CommentSchema, CommentInput>({url: '/api/comments', token, body: input});
    return {
        ...comment,
        project_id: input.project_id
    };}

const useAddComment = () => {
    const {data, sendRequest, error} = useRequest(addComment);
    const {mutate} = useTask(data?.task_id.toString(), data?.project_id.toString());
    const {mutate: mutateTasks} = useTasks(data?.project_id.toString());
    useEffect(() => {
        if(data) {
            mutate(task => {
                if(!task) {
                    return;
                }
                const {project_id, ...comment} = data;
                return {
                    ...task,
                    comments: [comment, ...task.comments]
                }
            })
            mutateTasks()
        }
    }, [data, mutate, mutateTasks])
    return sendRequest;
}

export default useAddComment;