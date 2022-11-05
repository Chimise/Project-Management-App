import React, {useReducer} from 'react';
import {generateId, generateDate} from '../../utils';


export interface Comment {
    id: string;
    message: string;
    favourite: boolean;
    like: boolean;
}

export interface Task {
    id: string;
    name: string;
    tag: string;
    description: string;
    status: 0 | 1 | 2;
    createdAt: string;
    comments: Array<Comment>;

}

export interface Project {
    id: string;
    name: string;
    createdAt: string;
    tasks: Array<Task>;
}

export interface TaskContext {
    projects: Array<Project>;
    addProject: (name: string) => string;
    removeProject: (id: string) => void;
    addTask: (projectId: string, name: string, tag: string, description: string, comments: Comment[]) => void;
    removeTask: (projectId: string, id: string) => void;
}

export interface State {
    projects: Array<Project>;
}

export const TaskContext = React.createContext<TaskContext | null>(null);

type Actions = {type: 'ADD_PROJECT', payload: {id: string; name: string;}} | {type: 'REMOVE_PROJECT', payload: string} | {type: 'ADD_TASK', payload: {projectId: string, task: Omit<Task, 'id'|'status'|'createdAt'>}} | {type: 'REMOVE_TASK', payload: {projectId: string; id: string;}}

const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case 'ADD_PROJECT': {
            const id = action.payload.id;
            const createdAt = generateDate();
            const newProject = {name: action.payload.name, id, tasks: [], createdAt};
            return {
                projects: [newProject, ...state.projects]
            }
        }
        case 'REMOVE_PROJECT': {
            const filteredProjects = state.projects.filter(project => project.id !== action.payload);
            return {
                projects: filteredProjects
            }
        }
        case 'ADD_TASK': {
            const projectId = action.payload.projectId;
            const projectIndex = state.projects.findIndex(project => project.id == projectId);
            if(projectIndex === -1) {
                return state;
            }
            const task = action.payload.task;
            const id = generateId();
            const createdAt = generateDate()
            const newTask: Task = {id, createdAt, status: 0, ...task};
            const project = state.projects[projectIndex];
            state.projects[projectIndex] = {
                ...project,
                tasks: [newTask, ...project.tasks]
            }
            return state;
        }
        case 'REMOVE_TASK': {
            const projectIndex = state.projects.findIndex(proj => proj.id === action.payload.projectId);
            if(projectIndex === -1) {
                return state;
            }
            const project = state.projects[projectIndex];
            const updatedTasks = project.tasks.filter(task => task.id !== action.payload.id);
            state.projects[projectIndex] = {
                ...project,
                tasks: updatedTasks
            };

            return state;
        }

        default: 
            return state;
    }
    
}

export default function TaskContextProvider({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(reducer, {projects: []});

    const addProject = (name: string): string => {
        const id = generateId();
        dispatch({type: 'ADD_PROJECT', payload: {
            id,
            name
        }});
        return id;
    }
    const removeProject = (id: string) => {
        dispatch({type: 'REMOVE_PROJECT', payload: id});
    }
    const addTask = (projectId: string, name: string, tag: string, description: string, comments: Array<Comment>) => {
        dispatch({type: 'ADD_TASK', payload: {
            projectId,
            task: {
                name,
                tag, 
                description,
                comments
            }
        }});
    }

    const removeTask = (projectId: string, id: string) => {
        dispatch({type: 'REMOVE_TASK', payload: {
            projectId,
            id
        }});
    }


    return (<TaskContext.Provider value={{...state, addTask, removeTask, addProject, removeProject}}>
        {children}
    </TaskContext.Provider>)
}