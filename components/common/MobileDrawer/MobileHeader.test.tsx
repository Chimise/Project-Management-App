import "whatwg-fetch";
import "@testing-library/jest-dom";
import { render, user, waitForElementToBeRemoved} from "../../../test/test-utils";
import server from "../../../test/server";
import router, { mockPush, mockUseRouter} from "../../../test/router";
import useAuth from "../../../hooks/useAuth";
import MobileHeader from './MobileHeader';

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

test('The mobile drawer displays when the user clicks the open icon and disappers when the close button is clicked', async () => {
    
    const {getByTestId, getByRole, queryByTestId} = render(<MobileHeader />)
    const openDrawerBtn = getByRole('button', {name: /open-button/i, hidden: true});
    expect(queryByTestId('drawer')).not.toBeInTheDocument();

    await user.click(openDrawerBtn);
    const drawer = getByTestId('drawer');
    expect(drawer).toBeInTheDocument();

    user.click(getByRole('button', {name: /close-button/i, hidden: true}));
    await waitForElementToBeRemoved(drawer);
    
});

test('The user goes to the homepage when the logo is clicked', async () => {
    const {getByTestId} = render(<MobileHeader />);
    const logo = getByTestId('logo');
    await user.click(logo);
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/');
})


