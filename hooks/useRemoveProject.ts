import { useEffect } from "react";
import useRequest from "./useRequest";
import { sendRequest } from "../utils";
import { ProjectSchema } from "../models/Project";
import useProjects from "./useProjects";
import { useRouter } from "next/router";

const removeProject = async (id: number, token: string) => {
    const project = await sendRequest<ProjectSchema, any>({url: `/api/projects/${id}`, method: 'DELETE', token});
    console.log(project);
    return project;
}

const useRemoveProject = () => {
    const {sendRequest, data: project} = useRequest(removeProject);
    const {mutate} = useProjects()
    const {push} = useRouter();
    
    useEffect(() => {
        if(project) {
            mutate(prevProjects => {
                if(!prevProjects) {
                    return;
                }
                return prevProjects.filter(proj => proj.id !== proj.id);
            }, false);
            push('/dashboard/projects');
        }
    }, [mutate, project, push])
    
    return sendRequest;
}

export default useRemoveProject;