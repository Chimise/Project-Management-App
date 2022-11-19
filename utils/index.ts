import {
  BoltIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  ArrowUpTrayIcon,
  Squares2X2Icon,
  FireIcon,
  PresentationChartLineIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import { JSXElementConstructor } from "react";
import Boom from "@hapi/boom";
import RequestError from "./RequestError";

export type Icons =
  | "dashboard"
  | "project"
  | "report"
  | "message"
  | "setting"
  | "logout"
  | "completed"
  | "progress"
  | "created";

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
  created: Square3Stack3DIcon,
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
};

export const generateDate = () => {
  const date = new Date().toISOString();
  return date;
};

export const getQuery = (query: string | string[] | undefined) => {
  query = Array.isArray(query) ? query[0] : query;
  return query;
};

interface RequestArgs<Body> {
  headers?: { [key: string]: string };
  body?: Body;
  method?: "POST" | "PATCH" | "DELETE" | "PUT" | 'GET';
  url: string;
  token?: string;
}

export async function sendRequest<Data, Body>({
  headers = {},
  body,
  method = "POST",
  url,
  token,
}: RequestArgs<Body>) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body): null,
  });

  const data = await response.json()
  if (!response.ok) {
    console.log(Boom.isBoom(data))
    const error = data.isBoom ? new RequestError(data.output.payload.message, data.output.statusCode) : new RequestError('An error occurred, please try again later', response.status)
    throw error;
  }
 
  return data as Data;
}
