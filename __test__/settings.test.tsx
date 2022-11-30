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
import SettingsPage from '../pages/dashboard/settings';

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

test('A success alert message is shown when the user updates the profile', async () => {
    const {getByLabelText, getByRole, queryByRole} = render(<SettingsPage />);
    const nameInput = getByLabelText(/name/i);
    const updateNameBtn = getByRole('button', {name: 'Update Name'});
    await user.type(nameInput, 'Chimise pro');
    await user.click(updateNameBtn);
    await waitFor(() => expect(queryByRole('alert', {description: /your profile was/i})).toBeInTheDocument());
})

test('An error is shown when the user enters a different password in the confirm password input', async () => {
    const {getAllByLabelText, getByRole, queryByRole} = render(<SettingsPage />);
    const passwordInputs = getAllByLabelText(/password/i, {selector: 'input'});
    
    const updatePasswordBtn = getByRole('button', {name: 'Update Password'});
    await user.type(passwordInputs[0], 'password');
    await user.type(passwordInputs[1], 'passwrod');
    await user.click(updatePasswordBtn);
    
   await waitFor(() =>  expect(passwordInputs[1]).toHaveErrorMessage(/password do not match/i));
    
});

test('An error alert message is shown when the user submits an invalid password', async () => {
    const {getAllByLabelText, getByRole, queryByRole} = render(<SettingsPage />);
    const passwordInputs = getAllByLabelText(/password/i, {selector: 'input'});
    
    const updatePasswordBtn = getByRole('button', {name: 'Update Password'});
    await user.type(passwordInputs[0], 'password');
    await user.type(passwordInputs[1], 'password');
    await user.click(updatePasswordBtn);

    await waitFor(() => expect(queryByRole('alert', {description: /password not allowed/i})).toBeInTheDocument());
})

test('An success alert message is shown when the user submits a valid password', async () => {
    const {getAllByLabelText, getByRole, queryByRole} = render(<SettingsPage />);
    const passwordInputs = getAllByLabelText(/password/i, {selector: 'input'});
    
    const updatePasswordBtn = getByRole('button', {name: 'Update Password'});
    await user.type(passwordInputs[0], 'hello');
    await user.type(passwordInputs[1], 'hello');
    await user.click(updatePasswordBtn);

    await waitFor(() => expect(queryByRole('alert', {description: /your profile was suc/i})).toBeInTheDocument());
})