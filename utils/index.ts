import {
    BoltIcon,
    Cog6ToothIcon,
    EnvelopeIcon,
    PencilSquareIcon,
    ArrowUpTrayIcon,
    Squares2X2Icon,
    FireIcon,
    PresentationChartLineIcon,
    Square3Stack3DIcon
  } from "@heroicons/react/24/solid";
  import { JSXElementConstructor } from "react";

export type Icons = 'dashboard'|'project'|'report'|'message'|'setting'|'logout'|'completed'|'progress'|'created';

export const icons: {
    [Icon in Icons]: JSXElementConstructor<React.ComponentProps<"svg">>;
  } = {
    dashboard: Squares2X2Icon,
    project: BoltIcon,
    report: PencilSquareIcon,
    message: EnvelopeIcon,
    setting: Cog6ToothIcon,
    logout: ArrowUpTrayIcon,
    completed: FireIcon,
    progress: PresentationChartLineIcon,
    created: Square3Stack3DIcon

  };

export type Status = 0 | 1 | 2;
export interface BaseSchema {
  id: number;
  created_at: string;
  updated_at: string;
}

let counter = 0;
  
export const generateId = () => {
    counter++;
  return `${Date.now() + counter}`;
}

export const generateDate = () => {
  const date = new Date().toISOString();
  return date;
};

export const getQuery = (query: string | string[] | undefined) => {
  query = Array.isArray(query) ? query[0] : query;
  return query;
}

