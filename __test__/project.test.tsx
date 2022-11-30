import "whatwg-fetch";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  user,
  waitFor,
  waitForElementToBeRemoved,
} from "../test/test-utils";
import server from "../test/server";
import router, { mockUseRouter, mockPush } from "../test/router";
import useAuth from "../hooks/useAuth";
import ProjectPage from "../pages/dashboard/projects/[id]";

beforeAll(() => {
  server.listen({
    onUnhandledRequest(req) {
      console.log(`${req.method} method ${req.url.pathname} pathname`);
    },
  });
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  jest.useFakeTimers();
  server.resetHandlers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter({
  query: {
    id: "1",
  },
});

const mockLogin = jest.fn();
const mockLogout = jest.fn();

jest.mock("../hooks/useAuth", () => {
  return jest.fn(() => ({
    loginHandler: mockLogin,
    token: "hello",
    logoutHandler: mockLogout,
    isLoading: false,
  }));
});

test('Clicking the todo, progress and completed task buttons redirected the user with the correct query', async () => {
    const {findAllByRole} = render(<ProjectPage />);
    const addTaskBtns = await findAllByRole('button', {name: /add task/i});
    await user.click(addTaskBtns[0]);
    expect(mockPush).toHaveBeenLastCalledWith({pathname: '/dashboard/projects/[id]/add-task', query: {
      id: 1,
      status: 0
    }});
    await user.click(addTaskBtns[1]);
    expect(mockPush).toHaveBeenLastCalledWith({pathname: '/dashboard/projects/[id]/add-task', query: {
      id: 1,
      status: 1
    }});
    await user.click(addTaskBtns[2]);
    expect(mockPush).toHaveBeenLastCalledWith({pathname: '/dashboard/projects/[id]/add-task', query: {
      id: 1,
      status: 2
    }});
    
})

test('The project with id matching the id url params is fetched', async () => {
  const {findByText} = render(<ProjectPage />);
  const projectTitle = await findByText(/my first project/i);
  const taskName = await findByText(/this is my first task/i);
  expect(projectTitle).toBeInTheDocument();
  expect(taskName).toBeInTheDocument();
})

test('Clicking the task card redirects the user to the task detail page', async () => {
  const {findByText} = render(<ProjectPage />);
  const taskName = await findByText(/this is my first task/i);
  await user.click(taskName.parentElement!);
  expect(mockPush).toHaveBeenCalledWith('/dashboard/projects/1/tasks/1');
})

