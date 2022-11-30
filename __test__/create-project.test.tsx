import "whatwg-fetch";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  user,
  waitFor
} from "../test/test-utils";
import server from "../test/server";
import router, { mockUseRouter, mockPush } from "../test/router";
import useAuth from "../hooks/useAuth";
import CreateProjectPage from '../pages/dashboard/projects';

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

test('The user is redirected when a new project is created', async () => {
    const {getByPlaceholderText, queryByText} = render(<CreateProjectPage />)
    const projectInput = getByPlaceholderText(/create a project/i);
    const name = 'My test project';
    await user.type(projectInput, name);
    await user.type(projectInput, '{Enter}');
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith('/dashboard/projects/3/add-task');
    })
})
