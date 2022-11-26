import {rest} from 'msw';
import Boom from '@hapi/boom';
import { Task } from '../hooks/useAddTask';
import { Project } from '../hooks/useProject';
import { CommentSchema } from '../models/Comment';
import { UserMessage } from '../hooks/useMessages';
import { UserReport } from '../hooks/useReports';

const created_at = new Date(Date.now() - 10003993).toISOString();
const updated_at = new Date().toISOString();

const messages: UserMessage[] = [{id: 1, created_at, updated_at, viewed: false, user_id: 1, message: {id: 1, title: 'My first message', content: 'This is the first message that ...', updated_at, created_at}}]
const reports: UserReport[] = [{id: 1, created_at, updated_at, viewed: true, user_id: 1, report: {id: 1, title: 'My first report', content: 'This is my first report...', created_at, updated_at, action: 'Update'}}];
const comments: CommentSchema[] = [{id: 1, created_at, updated_at, message: 'This is my first comment', task_id: 1, user_id: 1, like: false, favorite: true}, {id: 2, created_at, updated_at, message: 'This is my second comment', task_id: 2, user_id: 1, like: true, favorite: true}]
const tasks: Task[] = [{id: 1, created_at, updated_at, comments: [], name: 'My first task', status: 0, tag: 'first', description: 'This is my first task', user_id: 1, project_id: 1}, {id: 2, created_at, updated_at, comments, name: 'My second task', description: 'This is my second task', project_id: 1, user_id: 1, tag: 'second', status: 2}];
const projects: Project[] = [{id: 1, created_at, updated_at, tasks, user_id: 1, name: 'My first project' }]

const handler = [rest.post('/api/auth/login', async (req, res, ctx) => {

    const body = await req.json() as {email: string, password: string};
    if(body.password === 'password') {
        return res(ctx.status(401), ctx.json(Boom.unauthorized('Invalid credentials')))
    }
    return res(ctx.status(200), ctx.json({jwt: 'jwtuser', user: {
        id: 1,
        email: body.email
    }}))
    
}), 
rest.post('/api/auth/signup', async (req, res, ctx) => {
    const body = await req.json() as {name: string, email: string, password: string};
    if(body.email === 'task@task.com') {
        return res(ctx.status(400), ctx.json(Boom.notFound('Email already exist')));
    }
    return res(ctx.status(200), ctx.json({
        jwt: 'jwtuser',
        user: {
            id: 2,
            email: body.email,
            name: body.name
        }
    }));

}),
rest.get('/api/projects', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(projects));
}),
rest.get('/api/projects/:id', (req, res, ctx) => {
    const id = req.params.id as string;
    if(parseInt(id) !== 1) {
        return res(ctx.status(404), ctx.json(Boom.notFound('Project not found')))
    }
    return res(ctx.status(200), ctx.json(projects[0]));
}),
rest.post('/api/projects', async (req, res, ctx) => {
    const body = await req.json() as Pick<Project, 'name'>
    if(!body.name) {
        return res(ctx.status(400), ctx.json(Boom.badRequest('Bad Request')));
    }
    return res(ctx.status(200), ctx.json({
        user_id: 1,
        created_at,
        updated_at,
        tasks: [],
        id: 2,
        name: body.name,
    }))
}),
rest.get('/api/tasks', async (req, res, ctx) => {
    const project_id = req.url.searchParams.get('project_id')!;
    if(parseInt(project_id) !== 1) {
        return res(ctx.status(400), ctx.json(Boom.notFound('Not Found')));
    }
    return res(ctx.status(200), ctx.json(tasks));
}),
rest.get('/api/tasks/:id', async (req, res, ctx) => {
    const project_id = req.url.searchParams.get('project_id')!;
    const id = req.params.id as string;
    const task = tasks.find(task => task.id === parseInt(id));
    if(parseInt(project_id) !== 1 || !task) {
        return res(ctx.status(404), ctx.json(Boom.notFound('Not Found')));
    }
    
    return res(ctx.status(200), ctx.json(task));
}),
rest.post('/api/tasks', async (req, res, ctx) => {
    const project_id = req.url.searchParams.get('project_id')!;
    const body = await req.json() as Pick<Task, 'comments'|'tag'|'status'|'name'|'description'>
    if(parseInt(project_id) !== 1) {
        return res(ctx.status(404), ctx.json(Boom.notFound('Not Found')));
    }
    if(!body.comments || !body.tag || !body.status || !body.name || !body.description) {
        return res(ctx.status(400), ctx.json(Boom.notFound('Bad Request')));
    }

    return res(ctx.status(200), ctx.json({
        id: 3,
        name: body.name,
        status: body.status,
        description: body.description,
        comment: body.comments.map(comment => ({
            ...comment,
           created_at,
           updated_at, 
        })),
        tag: body.tag
    }))

}),
rest.get('/api/users/me', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({
        id: 1,
        name: 'John Doe',
        email: 'task@task.com',
        created_at,
        updated_at,
        projects
    }))
}),
rest.get('/api/messages', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(messages));
}),
rest.get('/api/reports', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(reports));
}) 
]

export default handler;