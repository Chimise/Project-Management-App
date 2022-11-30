import "whatwg-fetch";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  user,
  within
} from "../test/test-utils";
import server from "../test/server";
import router, { mockUseRouter, mockPush } from "../test/router";
import useAuth from "../hooks/useAuth";
import Dashboard from '../pages/dashboard';

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

jest.mock("../hooks/useAuth", () => {
  return jest.fn(() => ({
    loginHandler: login,
    token: "hello",
    logoutHandler: logout,
    isLoading: false,
  }));
});

test('The route is changed when the user clicks the project, report and message card', async () => {
    const {getByRole} = render(<Dashboard />)
    const grid = getByRole('grid');
    const cards = within(grid).getAllByRole('button');
    await user.click(cards[0]);
    expect(mockPush).toHaveBeenLastCalledWith('/dashboard/projects');
    await user.click(cards[1]);
    expect(mockPush).toHaveBeenLastCalledWith('/dashboard/reports');
    await user.click(cards[2]);
    expect(mockPush).toHaveBeenLastCalledWith('/dashboard/messages');
});

test('The project, report and message cards shows the expected text', async () => {
    const {findByRole} = render(<Dashboard />);
    const projectCard = await findByRole('button', {name: /2 projects/i});
    
    const reportCard = await findByRole('button', {name: /1 report/});
    const messageCard = await findByRole('button', {name: /1 message/});
    
    expect(projectCard).toBeInTheDocument();
    expect(reportCard).toBeInTheDocument();
    expect(messageCard).toBeInTheDocument();
});
