import '@testing-library/jest-dom';
import 'whatwg-fetch';
import {render, user, screen} from '../../../test/test-utils';
import server from '../../../test/server';
import router, {mockPush, mockUseRouter} from '../../../test/router';
import AddTask from '../AddTask';
import useAuth from '../../../hooks/useAuth';

const project = {
    id: 1,
    tasks: [],
    user_id: 1,
    created_at: new Date().toDateString(),
    updated_at: new Date().toISOString(),
    name: "New Project"
}

beforeAll(() => {
    server.listen({onUnhandledRequest(req) {
        console.log(`${req.method} method ${req.url.pathname} pathname`)
    }});
})

afterAll(() => {
    server.close();
})


beforeEach(() => {
    jest.useFakeTimers();
    mockPush.mockClear();
    server.resetHandlers();
    
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  
  mockUseRouter();

  const login = jest.fn();
  const logout = jest.fn();

  jest.mock('../../../hooks/useAuth', () => {
    return jest.fn(() => ({
        loginHandler: login,
        token: 'hello',
        logoutHandler: logout,
        isLoading: false
    }));
});

test('Render the the appropriate no of tasks grouped by status', async () => {
    const {rerender, findByTestId} = render(<AddTask project={project} statusType='created' />)

    const query = findByTestId('task-remaining')

    const remainingCreated = await query;
    expect(remainingCreated).toBeInTheDocument();
    expect(remainingCreated).toHaveTextContent(/1/)

    rerender(<AddTask project={project} statusType='progress' />)
    const remainingProgress = await query;
    expect(remainingProgress).toBeInTheDocument();
    expect(remainingProgress).toHaveTextContent(/0/);

    rerender(<AddTask project={project} statusType='completed' />)
    const remainingCompleted = await query;
    expect(remainingCompleted).toBeInTheDocument();
    expect(remainingCompleted).toHaveTextContent(/1/);
});

test('Ensure that the user is redirected to the correct route the add to task button is clicked', async () => {
    const param = {
        pathname: '/dashboard/projects/[id]/add-task',
        query: {
            id: 1,
            status: 0
        }
    }
    const {rerender, getByRole} = render(<AddTask project={project} statusType='created' />);
    const button = getByRole('button', {name: /add task/i});
    await user.click(button);
    expect(mockPush).toHaveBeenLastCalledWith(param);

    rerender(<AddTask project={project} statusType='progress' />)
    await user.click(button);
    param.query.status = 1;
    expect(mockPush).toHaveBeenLastCalledWith(param);

    rerender(<AddTask project={project} statusType='completed' />)
    await user.click(button);
    param.query.status = 2;
    expect(mockPush).toHaveBeenLastCalledWith(param);
})