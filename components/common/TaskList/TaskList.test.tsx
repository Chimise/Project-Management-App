import "whatwg-fetch";
import "@testing-library/jest-dom";
import {
  render,
  waitFor
} from "../../../test/test-utils";
import server from "../../../test/server";
import router, { mockUseRouter } from "../../../test/router";
import useAuth from "../../../hooks/useAuth";
import TaskList from "./TaskList";

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

jest.mock("../../../hooks/useAuth", () => {
  return jest.fn(() => ({
    loginHandler: login,
    token: "hello",
    logoutHandler: logout,
    isLoading: false,
  }));
});

const project = {
    id: 2,
    tasks: [],
    user_id: 1,
    created_at: new Date().toDateString(),
    updated_at: new Date().toISOString(),
    name: "New Project",
  };

test('It renders a fallback layout when the task is empty', async () => {
    const {getByTestId, queryByRole} = render(<TaskList statusType='completed' project={project} />)
    const fallBack = getByTestId('fallback-layout');
    expect(fallBack).toBeInTheDocument();
    expect(queryByRole('list')).not.toBeInTheDocument();
});

test('It renders task cards when the task is not empty', async () => {
    project.id = 1;

    const {queryByTestId, getByRole} = render(<TaskList statusType="created" project={project} />)
    await waitFor(() => expect(queryByTestId('fallback-layout')).not.toBeInTheDocument())
    
    expect(getByRole('list')).not.toBeEmptyDOMElement();
    expect(getByRole('heading', {level: 5})).toHaveTextContent(/my first task/i);
})
