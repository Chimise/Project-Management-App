import React, {useEffect} from "react";
import { useRouter } from "next/router";
import moment from "moment";
import useProject from "../../../../hooks/useProject";
import Container from "../../../../components/ui/Container";
import DashboardHeader from "../../../../components/common/DashboardHeader";
import DeleteButton from "../../../../components/common/DeleteButton";
import AddTask, {TaskStatus} from "../../../../components/common/AddTask";
import TaskList from "../../../../components/common/TaskList";
import { getQuery } from "../../../../utils";
import Loading from "../../../../components/common/Loading";
import Error from "../../../../components/common/Error";
import useRemoveProject from "../../../../hooks/useRemoveProject";

const status: TaskStatus[] = ['created', 'progress', 'completed'];

const ProjectPage = () => {
  const {query, prefetch} = useRouter();
  const {project, error, isLoading, mutate} = useProject(getQuery(query.id));
  const sendRequest = useRemoveProject();

  useEffect(() => {
    prefetch('/dashboard/projects');
  }, [prefetch]);

  const removeProjectHandler = (id: number) => {
      sendRequest(id);
  }

  return (
    <Container className="h-full flex flex-col space-y-2">
      <DashboardHeader goBack />
      <div className="flex-1">
        {isLoading && (
          <Loading className="h-full" />
        )}
        {project && (
          <div className="w-full h-full">
            <div className="flex items-start justify-between mt-6 md:mt-8">
                <div className="space-y-2">
                    <h2 className='text-2xl md:text-4xl font-medium'>{project.name}</h2>
                    <p className="text-sm md:text-base text-slate-800">Created on {moment(project.created_at).format('dddd D MMMM, YYYY')} at {moment(project.created_at).format('HH:ss')}</p>
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
        {error && <Error className="h-full" onRetry={() => mutate()} />}
      </div>
    </Container>
  );
};

ProjectPage.isAuth = true;

export default ProjectPage;
