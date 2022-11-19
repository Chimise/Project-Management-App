import React from 'react';
import type {TaskStatus} from '../AddTask';
import {FolderOpenIcon, } from '@heroicons/react/24/outline';
import TaskCard from '../TaskCard';
import { useRouter } from 'next/router';
import type {ProjectSchema} from '../../../models/Project'
import useTasks from '../../../hooks/useTasks';


interface TaskListProps {
    statusType: TaskStatus;
    project: ProjectSchema
}


const TaskList = ({project, statusType}: TaskListProps) => {
   const {tasks, ...data} = useTasks(project.id.toString());
    const router = useRouter();
    const filteredTask = data[statusType];

    if(!filteredTask || filteredTask.length === 0) {
        return (<div className='flex items-center text-gray-400 justify-end space-y-4 flex-col w-full h-40'>
            <FolderOpenIcon className='w-12 h-12' />
            <div>Looks like this list is empty!</div>
        </div>)
    }
    return <ul className='w-full space-y-3'>
        {filteredTask.map(task => <TaskCard key={task.id} task={task} onClick={() => router.push(`/dashboard/projects/${project.id}/tasks/${task.id}`)} />)}
    </ul>
}

export default TaskList;