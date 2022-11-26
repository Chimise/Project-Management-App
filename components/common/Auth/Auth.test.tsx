import "@testing-library/jest-dom";
import { user, render } from "../../../test/test-utils";
import router, {
  mockUseRouter,
  mockReplace,
  mockPush,
} from "../../../test/router";
import Auth from "./Auth";
import useAuth from '../../../hooks/useAuth';

beforeEach(() => {
  mockReplace.mockClear();
  jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers()
});

mockUseRouter();

const mockLogin = jest.fn();
const mockLogout = jest.fn();


jest.mock("../../../hooks/useAuth", () => {
  return jest.fn().mockImplementation(() => ({
    loginHandler: mockLogin,
    token: "hello",
    logoutHandler: mockLogout,
    isLoading: false,
  }));
});

const child = <h1 data-testid="child">Hello World</h1>;

test("That the children is only visible if the user is authenticated", () => {
  
const {getByTestId} = render(<Auth>{child}</Auth>);
  expect(getByTestId('child')).toBeInTheDocument();
});

test('That the user will be redirected if not authenticated', () => {
    //@ts-ignore
    useAuth.mockImplementationOnce(() => ({
        loginHandler: mockLogin,
        token: null,
        logout: mockLogout,
        isLoading: false
    }))
    const {queryByTestId} = render(<Auth>{child}</Auth>);
    expect(queryByTestId('child')).not.toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalled();
})

test('That the loading component displays if it is still loading', () => {
    //@ts-ignore
    useAuth.mockImplementationOnce(() => ({
        loginHandler: mockLogin,
        token: null,
        logout: mockLogout,
        isLoading: true
    }))
    const {queryByTestId} = render(<Auth>{child}</Auth>);
    expect(queryByTestId('child')).not.toBeInTheDocument();
    expect(queryByTestId('spinner')).toBeInTheDocument();
})
