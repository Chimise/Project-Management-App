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
import MessagesPage from '../pages/dashboard/messages';

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

test('The message alert shows after the fetching all user messages', async () => {
  const { queryByRole, findByRole} = render(<MessagesPage /> );
    expect(queryByRole('alert', {name: 'message-alert'})).not.toBeInTheDocument();
    const alert = await findByRole('alert', {name: 'message-alert'});
    expect(alert).toBeInTheDocument();
});

test('The state of the accordion changes when it is clicked by the user', async () => {
  const {getByRole} = render(<MessagesPage />);
  const accordion = getByRole('button', {name: /my first message/i});
  await user.click(accordion);
  await waitFor(() => expect(accordion.parentElement?.getAttribute('data-viewed')).toBe('true'))
})
