import { useEffect, useRef } from "react";
import useRequest from "./useRequest";
import { sendRequest } from "../utils";
import { Project } from "./useProject";
import useProjects from './useProjects';
import {useRouter} from 'next/router';

type Body = { name: string };


const addProject = async (values: Body, token: string) => {
  const project = await sendRequest<Project, Body>({
    body: values,
    url: "/api/projects",
    token: token,
  });
  return project;
};

const useAddProject = (redirect: boolean = true) => {
  const {current: willRedirect} = useRef(redirect);
  const {mutate} = useProjects();
  const {push} = useRouter();
  const { data: project, error, sendRequest } = useRequest(addProject);

  useEffect(() => {
    if(project) {
      mutate();
      if(willRedirect) {
        push(`/dashboard/projects/${project.id}/add-task`);
      }
      
    }
  }, [project, mutate, push, willRedirect]);

  
  return {
    project,
    error,
    sendRequest,
  };
};

export default useAddProject;
