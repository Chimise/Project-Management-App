import {
  render,
  screen,
  user,
  waitFor,
  act,
  prettyDOM,
} from "../test/test-utils";
import SignInPage from "../pages/auth/signin";
import '@testing-library/jest-dom';
import router, {mockUseRouter, mockPush} from '../test/router';
import 'whatwg-fetch';
import server from "../test/server";


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

test("render the SignIn page unchanged", () => {
  const { container } = render(<SignInPage />);
  expect(container.firstChild).toMatchSnapshot();
});

test("check for error when an invalid value is submitted", async () => {
  render(<SignInPage />);
  const emailInput = screen.getByLabelText("email");
  const passwordInput = screen.getByLabelText("password");

  expect.assertions(4);

  expect(emailInput).not.toHaveErrorMessage(/enter a valid email/i);
  expect(passwordInput).not.toHaveErrorMessage(/your password/i);

  await user.type(emailInput, "hello there");
  await user.type(passwordInput, "pass");

  await user.click(screen.getByRole("button", { name: /sign in/i }));

  await waitFor(
    () => expect(emailInput).toHaveErrorMessage(/enter a valid email/i)
  );
  await waitFor(
    () =>
      expect(passwordInput).toHaveErrorMessage(
        /your password should be at least/i
      )
  );
});

test("Check that the form submits when the user enter a valid email and password", async () => {
  const { getByLabelText } = render(<SignInPage />);
  const emailInput = getByLabelText("email");
  const passwordInput = getByLabelText("password");
  

  await user.type(emailInput, "promise@gmail.com");
  await user.type(passwordInput, "password");

  await user.click(screen.getByRole("button", { name: /sign in/i }));
  

  act(() => {
    jest.runAllTimers();
  });

  await waitFor(() => {
    expect(emailInput).not.toHaveErrorMessage(/enter a valid email/i);
    expect(
      passwordInput
    ).not.toHaveErrorMessage(/password must be at least/i);
  });


});

test("Check that the form shows an error modal when an error response is recieved", async () => {
  const { getByLabelText, findByRole } = render(<SignInPage />);
  const emailField = getByLabelText("email")
  const passwordField = getByLabelText('password');

  await user.type(emailField, "task@task.com");
  await user.type(passwordField, "password");

  await user.click(screen.getByRole("button", { name: /sign in/i }));

  const alert = await findByRole("alert", { description: /invalid credentials/i });


  expect(alert).toBeInTheDocument()

  act(() => {
    jest.advanceTimersByTime(3000);
  })

  expect(alert).not.toBeInTheDocument();
});
