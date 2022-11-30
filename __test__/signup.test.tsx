import { getAllByLabelText, prettyDOM, render, user, waitFor, waitForElementToBeRemoved, act } from "../test/test-utils";
import "@testing-library/jest-dom";
import SignUpPage from "../pages/auth/signup";
import "whatwg-fetch";
import server from "../test/server";
import useAuth from '../hooks/useAuth';
import router, {mockUseRouter, mockPush} from '../test/router';

const login = jest.fn();
const logout = jest.fn();

jest.mock('../hooks/useAuth', () => {
    return jest.fn(() => ({
        loginHandler: login,
        token: '',
        logoutHandler: logout,
        isLoading: false
    }));
});

beforeAll(() => {
  server.listen({
    onUnhandledRequest(req) {
      console.log(`Request ${req.url.pathname} ${req.method}`);
    },
  });
});

afterEach(() => {
  server.resetHandlers();
  jest.useRealTimers();
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  server.close();
  jest.restoreAllMocks();
});

mockUseRouter();

test("Render the Sign Up page unchanged", () => {
  const { container } = render(<SignUpPage />);
  expect(container.firstChild).toMatchSnapshot();
});

test("Check for error when trying to signup with invalid data", async () => {
  const { getByLabelText, getByRole, findByText } = render(<SignUpPage />);
  const nameInput = getByLabelText("name");
  const emailInput = getByLabelText("email");
  const passwordInput = getByLabelText("password");
  const button = getByRole("button", { name: /sign up/i });

  expect.assertions(2);

  await user.type(nameInput, "chisom");
  await user.type(emailInput, "hello");
  await user.type(passwordInput, "user");

  await user.click(button);

  expect(emailInput).toHaveErrorMessage(/enter a valid email/i);
  expect(passwordInput).toHaveErrorMessage(/your password should be/i);

});

test("Submit an email already in existence and check for an error", async () => {
    const {getByLabelText, getByRole, findByRole} = render(<SignUpPage />)
   await user.type(getByLabelText('name'), 'chisom');
   await user.type(getByLabelText('email'), 'task@task.com');
   await user.type(getByLabelText('password'), 'password');

   await user.click(getByRole('button', {name: /sign up/i}));

   const alert = await findByRole('alert', {description: /email already exist/i});

   expect(alert).toBeInTheDocument();

   act(() => {
    jest.advanceTimersByTime(2500);
   })

   await waitForElementToBeRemoved(alert);
   
})

test('Submit a valid data and check that the user is redirected', async () => {
    const {getByLabelText, getByRole} = render(<SignUpPage />)

   await user.type(getByLabelText('name'), 'chisom');
   await user.type(getByLabelText('email'), 'taskr@taskr.com');
   await user.type(getByLabelText('password'), 'password');

   await user.click(getByRole('button', {name: /sign up/i}));


   await waitFor(() => expect(login).toHaveBeenCalled());
})
