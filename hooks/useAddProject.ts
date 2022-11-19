import { useEffect } from "react";
import useRequest from "./useRequest";
import { sendRequest } from "../utils";
import { ProjectSchema } from "../models/Project";
import useProjects from './useProjects';
import {useRouter} from 'next/router';

type Body = { name: string };

const addProject = async (values: Body, token: string) => {
  const project = await sendRequest<ProjectSchema, Body>({
    body: values,
    url: "/api/projects",
    token: token,
  });
  return project;
};

const useAddProject = (redirect: boolean = true) => {
  const {mutate} = useProjects();
  const {push} = useRouter();
  const { data: project, error, sendRequest } = useRequest(addProject);

  useEffect(() => {
    if(project) {
      mutate(prevProjects => [project, ...(prevProjects || [])], false);
      if(redirect) {
        push(`/dashboard/projects/${project.id}/add-task`);
      }
    }
  }, [project, mutate, push, redirect]);
  return {
    project,
    error,
    sendRequest,
  };
};

export default useAddProject;
