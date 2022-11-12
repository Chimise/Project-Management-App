import React from 'react';
import { Project } from '../../../store/TaskContext';
import type {TaskStatus} from '../AddTask';
import {FolderOpenIcon, } from '@heroicons/react/24/outline';
import TaskCard from '../TaskCard';
import { useRouter } from 'next/router';


interface TaskListProps {
    statusType: TaskStatus;
    project: Project
}

const status: {[key in TaskStatus]: number} = {
    created: 0,
    progress: 1,
    completed: 2
}

const TaskList = ({project, statusType}: TaskListProps) => {
    const tasks = project.tasks.filter(task => task.status === status[statusType]);
    const router = useRouter();

    if(tasks.length === 0) {
        return (<div className='flex items-center text-gray-400 justify-end space-y-4 flex-col w-full h-40'>
            <FolderOpenIcon className='w-12 h-12' />
            <div>Looks like this list is empty!</div>
        </div>)
    }
    return <ul className='w-full space-y-3'>
        {tasks.map(task => <TaskCard key={task.id} task={task} onClick={() => router.push(`/dashboard/projects/${project.id}/tasks/${task.id}`)} />)}
    </ul>
}

export default TaskList;