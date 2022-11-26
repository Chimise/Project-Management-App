import "whatwg-fetch";
import "@testing-library/jest-dom";
import {
  render,
  user,
  screen,
  waitFor,
  act,
  within,
} from "../../../test/test-utils";
import server from "../../../test/server";
import router, {
  mockPush,
  mockUseRouter,
  mockBack,
} from "../../../test/router";
import useAuth from "../../../hooks/useAuth";
import DashboardLayout from "./DashboardLayout";

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

const children = <span data-testid='children'>Hello</span>;

test("Ensure that the link elements disappears when the navbar is collapsed", async () => {
  const { getByRole, getByText, queryByRole, queryByText } = render(
    <DashboardLayout>{children}</DashboardLayout>
  );
  const collapseBtn = getByRole("button", { name: "collapse-button" });
  const dashboardLink = getByText(/dashboard/i);
  expect(dashboardLink).toBeInTheDocument();

  act(() => {
    user.click(collapseBtn);
  })

  await waitFor(() => {
    expect(within(collapseBtn).queryByTestId('collapse')).not.toBeInTheDocument();
    expect(queryByText(/dashboard/i)).not.toBeInTheDocument();
  })
  expect(within(collapseBtn).getByTestId("expand")).toBeInTheDocument();
});

test('That the user logout when the logout button is pressed', async () => {
    const {getByRole} = render(<DashboardLayout>{children}</DashboardLayout>);
    const button = getByRole('button', {name: /logout/i});
    await user.click(button);
    expect(logout).toHaveBeenCalled();
});

test('Ensure that the children are rendered', () => {
    const {getByTestId} = render(<DashboardLayout>{children}</DashboardLayout>)
    expect(getByTestId('children')).toBeInTheDocument();
})

