import React, { useReducer } from "react";
import { generateId, generateDate, Status } from "../../utils";

export interface Comment {
  id: string;
  message: string;
  favourite: boolean;
  like: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  name: string;
  tag: string;
  description: string;
  status: Status;
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
  addTask: (projectId: string, data: Omit<Task, "id" | "createdAt">) => void;
  removeTask: (projectId: string, id: string) => void;
  updateTask: (projectId: string, id: string, data: Partial<Omit<Task, 'id'|'createdAt'>>) => void;
}

export interface State {
  projects: Array<Project>;
}

export const TaskContext = React.createContext<TaskContext | null>(null);

type Actions =
  | { type: "ADD_PROJECT"; payload: { id: string; name: string } }
  | { type: "REMOVE_PROJECT"; payload: string }
  | {
      type: "ADD_TASK";
      payload: { projectId: string; task: Omit<Task, "id" | "createdAt"> };
    }
  | { type: "REMOVE_TASK"; payload: { projectId: string; id: string } }
  | {
      type: "UPDATE_TASK";
      payload: {
        projectId: string;
        id: string;
        data: Partial<Omit<Task, "id" | "createdAt">>;
      };
    };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "ADD_PROJECT": {
      const id = action.payload.id;
      const createdAt = generateDate();
      const newProject = {
        name: action.payload.name,
        id,
        tasks: [],
        createdAt,
      };
      return {
        projects: [newProject, ...state.projects],
      };
    }
    case "REMOVE_PROJECT": {
      const filteredProjects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      return {
        projects: filteredProjects,
      };
    }
    case "ADD_TASK": {
      const projectId = action.payload.projectId;
      const projectIndex = state.projects.findIndex(
        (project) => project.id == projectId
      );
      if (projectIndex === -1) {
        return state;
      }
      const task = action.payload.task;
      const id = generateId();
      const createdAt = generateDate();
      const newTask: Task = { id, createdAt, ...task };
      const project = state.projects[projectIndex];
      const updatedProjects = [...state.projects];

      updatedProjects[projectIndex] = {
        ...project,
        tasks: [newTask, ...project.tasks],
      };

      return {
        projects: updatedProjects,
      };
    }
    case "REMOVE_TASK": {
      const projectIndex = state.projects.findIndex(
        (proj) => proj.id === action.payload.projectId
      );
      if (projectIndex === -1) {
        return state;
      }
      const project = state.projects[projectIndex];
      const updatedTasks = project.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      const updatedProjects = [...state.projects];
      updatedProjects[projectIndex] = {
        ...project,
        tasks: updatedTasks,
      };

      return {
        projects: updatedProjects,
      };
    }
    case "UPDATE_TASK": {
      const projectId = action.payload.projectId;
      const taskId = action.payload.id;
      const projectIndex = state.projects.findIndex(
        (project) => project.id == projectId
      );
      if (projectIndex === -1) {
        return state;
      }
      const taskIndex = state.projects[projectIndex].tasks.findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex === -1) {
        return state;
      }

      const updatedProjects = [...state.projects];
      const updatedTasks = [...state.projects[projectIndex].tasks];
      const data = action.payload.data;
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        ...data,
      };

      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        tasks: updatedTasks,
      };

      return {
        projects: updatedProjects,
      };
    }

    default:
      return state;
  }
};

export default function TaskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, { projects: [] });

  const addProject = (name: string): string => {
    const id = generateId();
    dispatch({
      type: "ADD_PROJECT",
      payload: {
        id,
        name,
      },
    });
    return id;
  };
  const removeProject = (id: string) => {
    dispatch({ type: "REMOVE_PROJECT", payload: id });
  };
  const addTask = (projectId: string, data: Omit<Task, "id" | "createdAt">) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        projectId,
        task: data,
      },
    });
  };

  const removeTask = (projectId: string, id: string) => {
    dispatch({
      type: "REMOVE_TASK",
      payload: {
        projectId,
        id,
      },
    });
  };

  const updateTask = (projectId: string, id: string, data: Partial<Omit<Task, 'id'|'createdAt'>>) => {
    dispatch({
        type: 'UPDATE_TASK',
        payload: {
            projectId,
            id,
            data
        }
    })
  }

  return (
    <TaskContext.Provider
      value={{ ...state, addTask, removeTask, addProject, removeProject, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
