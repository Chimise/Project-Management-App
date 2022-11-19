import React, {useState, useEffect, useMemo} from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import Container from '../../../../../components/ui/Container';
import DashboardHeader from '../../../../../components/common/DashboardHeader';
import { getQuery } from '../../../../../utils';
import useTask from '../../../../../hooks/useTask';
import useProject from '../../../../../hooks/useProject';
import {SquaresPlusIcon} from '@heroicons/react/24/solid';
import Loading from '../../../../../components/common/Loading';
import UpdateTask from '../../../../../components/common/UpdateTask';
import Error from '../../../../../components/common/Error';


const UpdateTaskPage = () => {
    const {query} = useRouter();
    const {project} = useProject(getQuery(query.id));
    const {task, isLoading, error, mutate} = useTask(getQuery(query.taskId), getQuery(query.id));

    if(isLoading) {
        return <Loading className='h-full' />
    }

    if(error) {
        <Error message={error.message} onRetry={() => mutate()} />
    }


    return (<Container className="h-full flex flex-col">
    <DashboardHeader goBack />
    <div className="flex-1 mt-10 mb-6">
        {project && task && <div className='flex items-center space-x-1'>
            <SquaresPlusIcon className={cn('w-5 h-5', {'text-primary': task.status === 0, 'text-progress': task.status === 1, 'text-completed': task.status === 2})} />
            <p className='text-gray-800'>Opened a task for <span className='font-semibold text-black'>{project.name}</span></p>
        </div>}
        {task && project && <UpdateTask task={task} project={project} />}
    </div>
  </Container>
)
}

UpdateTaskPage.isAuth = true;

export default UpdateTaskPage;