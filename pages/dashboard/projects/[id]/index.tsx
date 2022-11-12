import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import useProjects from "../../../../hooks/useProjects";
import Container from "../../../../components/ui/Container";
import Spinner from "../../../../components/ui/Spinner";
import DashboardHeader from "../../../../components/common/DashboardHeader";
import DeleteButton from "../../../../components/common/DeleteButton";
import AddTask, {TaskStatus} from "../../../../components/common/AddTask";
import TaskList from "../../../../components/common/TaskList";
import { Project } from "../../../../store/TaskContext";

const status: TaskStatus[] = ['created', 'progress', 'completed'];

const ProjectPage = () => {
  const {prefetch, query, isReady, replace} = useRouter();
  const { projects, removeProject } = useProjects();
  const [project, setProject] = useState<Project>();

  // useEffect(() => {
  //   prefetch('/dashboard/projects');
  // }, [prefetch]);

  const removeProjectHandler = (id: string) => {
      removeProject(id);
      replace('/dashboard/projects');
  }

  useEffect(() => {
    if(isReady) {
      const projectId = Array.isArray(query.id) ? query.id[0] : query.id;
      const currentProject = projects.find(proj => proj.id === projectId);
        if(currentProject) {
          setProject(currentProject)
        }else {
          replace('/dashboard/projects');
        }
    }
  }, [isReady, replace, query, projects]);

  return (
    <Container className="h-full flex flex-col space-y-2">
      <DashboardHeader goBack />
      <div className="flex-1">
        {!project && (
          <div className="w-full h-full flex items-center justify-center">
            {!project && !isReady && <Spinner />}
          </div>
        )}
        {project && (
          <div className="w-full h-full">
            <div className="flex items-start justify-between mt-6 md:mt-8">
                <div className="space-y-2">
                    <h2 className='text-2xl md:text-4xl font-medium'>{project.name}</h2>
                    <p className="text-sm md:text-base text-slate-800">Created on {moment(project.createdAt).format('dddd D MMMM, YYYY')} at {moment(project.createdAt).format('HH:ss')}</p>
                </div>
                <DeleteButton onConfirm={() => removeProjectHandler(project.id)} />
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-x-5 lg:gap-x-7">
              {status.map(stat => (<div key={stat} className='space-y-6'>
                <AddTask statusType={stat} project={project} />
                <TaskList statusType={stat} project={project} />
              </div>))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProjectPage;
