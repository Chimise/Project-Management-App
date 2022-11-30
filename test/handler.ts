import { rest } from "msw";
import Boom from "@hapi/boom";
import { Task } from "../hooks/useAddTask";
import { Project } from "../hooks/useProject";
import { CommentSchema } from "../models/Comment";
import { UserMessage } from "../hooks/useMessages";
import { UserReport } from "../hooks/useReports";

const created_at = new Date(Date.now() - 10003993).toISOString();
const updated_at = new Date().toISOString();

const messages: UserMessage[] = [
  {
    id: 1,
    created_at,
    updated_at,
    viewed: false,
    user_id: 1,
    message: {
      id: 1,
      title: "My first message",
      content: "This is the first message that ...",
      updated_at,
      created_at,
    },
  },
];
const reports: UserReport[] = [
  {
    id: 1,
    created_at,
    updated_at,
    viewed: false,
    user_id: 1,
    report: {
      id: 1,
      title: "My first report",
      content: "This is my first report...",
      created_at,
      updated_at,
      action: "Update",
    },
  },
];
const comments: CommentSchema[] = [
  {
    id: 1,
    created_at,
    updated_at,
    message: "This is my first comment",
    task_id: 1,
    user_id: 1,
    like: false,
    favorite: true,
  },
  {
    id: 2,
    created_at,
    updated_at,
    message: "This is my second comment",
    task_id: 2,
    user_id: 1,
    like: true,
    favorite: true,
  },
];
const tasks: Task[] = [
  {
    id: 1,
    created_at,
    updated_at,
    comments: [],
    name: "My first task",
    status: 0,
    tag: "first",
    description: "This is my first task",
    user_id: 1,
    project_id: 1,
  },
  {
    id: 2,
    created_at,
    updated_at,
    comments,
    name: "My second task",
    description: "This is my second task",
    project_id: 1,
    user_id: 1,
    tag: "second",
    status: 2,
  },
];
const projects: Project[] = [
  {
    id: 1,
    created_at,
    updated_at,
    tasks,
    user_id: 1,
    name: "My first project",
  },
  {
    id: 2,
    created_at,
    updated_at,
    tasks: [],
    user_id: 1,
    name: "My second project",
  },
];

const handler = [
  rest.post("/api/auth/login", async (req, res, ctx) => {
    const body = (await req.json()) as { email: string; password: string };
    if (body.password === "password") {
      return res(
        ctx.status(401),
        ctx.json(Boom.unauthorized("Invalid credentials"))
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        jwt: "jwtuser",
        user: {
          id: 1,
          email: body.email,
        },
      })
    );
  }),
  rest.post("/api/auth/signup", async (req, res, ctx) => {
    const body = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    if (body.email === "task@task.com") {
      return res(
        ctx.status(400),
        ctx.json(Boom.notFound("Email already exist"))
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        jwt: "jwtuser",
        user: {
          id: 1,
          email: body.email,
          name: body.name,
        },
      })
    );
  }),
  rest.get("/api/projects", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(projects));
  }),
  rest.get("/api/projects/:id", (req, res, ctx) => {
    const id = req.params.id as string;
    const project = projects.find((project) => project.id === parseInt(id));
    if (!project) {
      return res(ctx.status(404), ctx.json(Boom.notFound("Project not found")));
    }
    return res(ctx.status(200), ctx.json(project));
  }),
  rest.delete("/api/projects/:id", (req, res, ctx) => {
    const id = req.params.id as string;
    const project = projects.find((project) => project.id === parseInt(id));
    if (!project) {
      return res(ctx.status(404), ctx.json(Boom.notFound("Project not found")));
    }
    return res(ctx.status(200), ctx.json(project));
  }),
  rest.post("/api/projects", async (req, res, ctx) => {
    const body = (await req.json()) as Pick<Project, "name">;
    if (!body.name) {
      return res(ctx.status(400), ctx.json(Boom.badRequest("Bad Request")));
    }
    return res(
      ctx.status(200),
      ctx.json({
        user_id: 1,
        created_at,
        updated_at,
        tasks: [],
        id: 3,
        name: body.name,
      })
    );
  }),
  rest.put("/api/users", async (req, res, ctx) => {
    const body = (await req.json()) as Partial<{
      name: string;
      password: string;
    }>;
    if (body.password === "password") {
      return res(
        ctx.status(400),
        ctx.json(Boom.badRequest("Password not allowed"))
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        created_at,
        updated_at,
        projects,
        name: body.name || "John Doe",
        email: "task@task.com",
      })
    );
  }),
  rest.get("/api/tasks", async (req, res, ctx) => {
    const project_id = req.url.searchParams.get("project_id")!;
    const project = projects.find(
      (project) => project.id === parseInt(project_id)
    );

    if (!project) {
      return res(ctx.status(400), ctx.json(Boom.notFound("Not Found")));
    }

    return res(ctx.status(200), ctx.json(project.tasks));
  }),
  rest.get("/api/tasks/:id", async (req, res, ctx) => {
    const project_id = req.url.searchParams.get("project_id") as string;
    const id = req.params.id as string;
    const project = projects.find(
      (project) => project.id === parseInt(project_id)
    );
    if (!project) {
      return res(ctx.status(400), ctx.json(Boom.notFound("Not Found")));
    }
    const task = project.tasks.find((task) => task.id === parseInt(id));
    if (!task) {
      return res(ctx.status(404), ctx.json(Boom.notFound("Not Found")));
    }

    return res(ctx.status(200), ctx.json(task));
  }),
  rest.post("/api/tasks", async (req, res, ctx) => {
    const project_id = req.url.searchParams.get("project_id")!;
    const body = (await req.json()) as Pick<
      Task,
      "comments" | "tag" | "status" | "name" | "description"
    >;
    if (!body.comments || !body.tag || !body.name || !body.description) {
      return res(ctx.status(400), ctx.json(Boom.notFound("Bad Request")));
    }

    if (body.status === undefined) {
      return res(ctx.status(400), ctx.json(Boom.notFound("Bad Request")));
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: 3,
        name: body.name,
        status: body.status,
        description: body.description,
        project_id: 1,
        user_id: 1,
        comment: body.comments.map((comment) => ({
          ...comment,
          created_at,
          updated_at,
        })),
        tag: body.tag,
      })
    );
  }),
  rest.put("/api/tasks/:id", async (req, res, ctx) => {
    const id = req.params.id as string;
    const body = (await req.json()) as Pick<
      Task,
      "tag" | "status" | "name" | "description" | "project_id"
    >;
    const project = projects.find((project) => project.id == body.project_id);
    if (!project) {
      return res(ctx.status(400), ctx.json(Boom.notFound("Not Found")));
    }
    const task = project.tasks.find((task) => task.id === parseInt(id));
    if (!task) {
      return res(ctx.status(404), ctx.json(Boom.notFound("Not Found")));
    }

    return res(
      ctx.status(200),
      ctx.json({
        ...task,
        ...body,
      })
    );
  }),
  rest.delete("/api/tasks/:id", (req, res, ctx) => {
    const project_id = req.url.searchParams.get("project_id") as string;
    const id = req.params.id as string;
    const project = projects.find(
      (project) => project.id === parseInt(project_id)
    );

    if (!project) {
      return res(ctx.status(400), ctx.json(Boom.notFound("Not Found")));
    }
    const task = project.tasks.find((task) => task.id === parseInt(id));

    if (!task) {
      return res(ctx.status(404), ctx.json(Boom.notFound("Not Found")));
    }

    return res(ctx.status(200), ctx.json(task));
  }),
  rest.get("/api/users/me", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: "John Doe",
        email: "task@task.com",
        created_at,
        updated_at,
        projects,
      })
    );
  }),
  rest.get("/api/messages", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(messages));
  }),
  rest.get("/api/reports", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(reports));
  }),
  rest.patch("/api/messages/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...messages[0],
        viewed: true,
      })
    );
  }),
  rest.patch("/api/reports/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...reports[0],
        viewed: true,
      })
    );
  }),
];

export default handler;
