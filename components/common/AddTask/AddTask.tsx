import React from 'react';
import cn from 'classnames';
import { Project } from '../../../store/TaskContext';
import {icons} from '../../../utils';
import useTaskStatus from '../../../hooks/useTaskStatus';
import {PlusCircleIcon} from '@heroicons/react/20/solid';
import {useRouter} from 'next/router';

export type TaskStatus = 'progress' | 'completed' | 'created'

const status: {[Key in TaskStatus]: number} = {
    created: 0,
    progress: 1,
    completed: 2
}

type AddTaskProps = {
    statusType: TaskStatus,
    project: Project
}

const title: {[key in TaskStatus]: string} = {
    created: 'To Do',
    progress: 'In Progress',
    completed: 'Complete'
}

const AddTask = ({statusType, project}: AddTaskProps) => {
    const getStatus = useTaskStatus();
    const router = useRouter();
    const task = getStatus(project.id)[statusType];
    const word = task > 1 ? 'tasks' : 'task';
    const Icon = icons[statusType];

    const handleClick = (projectId: string) => {
        router.push({
            pathname: '/dashboard/projects/[id]/add-task',
            query: {
                id: projectId,
                status: status[statusType]
            }
        })
    }

    return (<div className='space-y-4'>
        <div className='flex space-x-3 items-center'>
            <div className='shrink-0 w-10'>
                <Icon className={cn('w-full h-full', {'text-primary': statusType === 'created', 'text-progress': statusType === 'progress', 'text-completed': statusType === 'completed'})} />
            </div>
            <div className='flex-1'>
                <h3 className='uppercase text-black font-semibold text-lg md:text-xl'>{title[statusType]}</h3>
                <p className='text-sm font-light text-gray-600'>{task}{` `}{word} remaining</p>
            </div>
        </div>
        <button onClick={() => handleClick(project.id)} className='inline-flex p-2 w-full bg-black text-white space-x-1 items-center justify-center'><PlusCircleIcon className='w-4 h-4' /> <span>Add Task</span></button>
    </div>)
}

export default AddTask;