import "whatwg-fetch";
import "@testing-library/jest-dom";
import { render, user, screen, waitForElementToBeRemoved } from "../../../test/test-utils";
import server from "../../../test/server";
import router, { mockPush, mockUseRouter, mockBack} from "../../../test/router";
import useAuth from "../../../hooks/useAuth";
import DashboardHeader from './DashboardHeader';

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

test('Checks whether the the popup is displayed when the the profile button is hovered and that is goes to the setting page', async () => {
    const {getByRole, getByText} = render(<DashboardHeader title='Products' goBack={false} />);
    expect(getByText(/Products/i)).toBeInTheDocument();
    const profileBtn = getByRole('button', {name: 'show-settings'})
    await user.hover(profileBtn);
    const popup = getByRole('dialog');

    expect(popup).toBeInTheDocument();
    user.unhover(popup);
    await waitForElementToBeRemoved(popup);

    await user.click(profileBtn);
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/dashboard/settings');
})

test('Checks that the go back button is visible when the goBack prop is true and that it works', async () => {
    const {getByRole} = render(<DashboardHeader title='Products' goBack={true} />);
    const goBack = getByRole('button', {name: 'back-button'});
    expect(goBack).toBeInTheDocument();
    await user.click(goBack);
    expect(mockBack).toHaveBeenCalled();
})


