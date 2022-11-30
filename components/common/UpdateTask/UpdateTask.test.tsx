import "whatwg-fetch";
import "@testing-library/jest-dom";
import { getByPlaceholderText, render, screen, user, waitFor } from "../../../test/test-utils";
import server from "../../../test/server";
import router, { mockUseRouter, mockPush } from "../../../test/router";
import useAuth from "../../../hooks/useAuth";
import UpdateTask from "./UpdateTask";

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

mockUseRouter();

const login = jest.fn();
const logout = jest.fn();

const task = {
  id: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  comments: [],
  name: "My first task",
  status: 0,
  tag: "first",
  description: "This is my first task",
  user_id: 1,
  project_id: 1,
};

const project = {
  id: 1,
  tasks: [task],
  user_id: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  name: "New Project",
};

jest.mock("../../../hooks/useAuth", () => {
  return jest.fn(() => ({
    loginHandler: login,
    token: "hello",
    logoutHandler: logout,
    isLoading: false,
  }));
});

test("That the user is redirected when the the task is deleted succesfully", async () => {
  const { getByRole } = render(<UpdateTask task={task} project={project} />);
  const deleteBtn = getByRole("button", { name: /delete-button/i });
  await user.click(deleteBtn);
  const confirmBtn = getByRole("button", { name: /confirm/i });
  await user.click(confirmBtn);
  await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));
});

test("That the user is not redirected when the task is not deleted", async () => {
  project.id = 2;
  const { getByRole } = render(<UpdateTask task={task} project={project} />);

  const deleteBtn = getByRole("button", { name: /delete-button/i });
  await user.click(deleteBtn);
  const confirmBtn = getByRole("button", { name: /confirm/i });
  await user.click(confirmBtn);
  await waitFor(() => expect(mockPush).not.toHaveBeenCalled());
});

test('A success alert message is shown when the user sucessfully updates a task', async () => {
  project.id = 1;
  const { getByRole, getByPlaceholderText, queryByRole } = render(<UpdateTask task={task} project={project} />);
  const nameInput = getByPlaceholderText(/enter task/i);
  const submitBtn = getByRole('button', {name: /update task/i});
  await user.type(nameInput, 'My first updated task');
  expect(submitBtn.getAttribute('data-changed')).toBe('true');
  await user.click(submitBtn);
  await waitFor(() => expect(queryByRole('alert', {description: /task updated/i})).toBeInTheDocument());
  
})

test('An error alert message is shown when the updating the task fails', async () => {
  project.id = 2;
  const { getByRole, getByPlaceholderText, queryByRole } = render(<UpdateTask task={task} project={project} />);
  const nameInput = getByPlaceholderText(/enter task/i);
  const submitBtn = getByRole('button', {name: /update task/i});
  await user.type(nameInput, 'My first updated task');
  expect(submitBtn.getAttribute('data-changed')).toBe('true');
  await user.click(submitBtn);
  await waitFor(() => expect(queryByRole('alert', {description: /not found/i})).toBeInTheDocument());
})