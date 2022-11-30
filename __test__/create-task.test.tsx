import "whatwg-fetch";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  user,
  waitFor,
  waitForElementToBeRemoved,
} from "../test/test-utils";
import server from "../test/server";
import router, { mockUseRouter, mockPush } from "../test/router";
import useAuth from "../hooks/useAuth";
import AddTaskPage from "../pages/dashboard/projects/[id]/add-task";

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

mockUseRouter({
  query: {
    id: "1",
  },
});

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

test("That a success alert message is seen by the user if a new task is created and that the form state is reset", async () => {
  const {
    findByPlaceholderText,
    getByPlaceholderText,
    getByRole,
    queryByRole,
  } = render(<AddTaskPage />);
  const nameInput = (await findByPlaceholderText(
    /enter task name/i
  )) as HTMLInputElement;
  const tagInput = (await findByPlaceholderText(
    /add tag/i
  )) as HTMLInputElement;
  const descriptionInput = (await findByPlaceholderText(
    /add description/i
  )) as HTMLInputElement;
  await user.type(nameInput, "Taskr Manager");
  await user.type(tagInput, "taskr");
  await user.type(descriptionInput, "An app that can manage your tasks");

  await user.click(getByRole("button", { name: "Add Comment" }));
  const commentInput = getByPlaceholderText(/add a comment/i);
  await user.type(commentInput, "This is a reminder");
  user.type(commentInput, "{Enter}");
  await waitForElementToBeRemoved(commentInput);

  const submitBtn = getByRole("button", { name: /create task/i });
  await user.click(submitBtn);
  await waitFor(() => {
    expect(
      queryByRole("alert", { description: /task created/i })
    ).toBeInTheDocument();
    expect(nameInput).toHaveValue("");
    expect(tagInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });
});



test('The button state changes when the initial values of the form changes', async () => {
    const {
        findByPlaceholderText,
        getByRole
      } = render(<AddTaskPage />);
      const nameInput = (await findByPlaceholderText(
        /enter task name/i
      )) as HTMLInputElement;
      await user.type(nameInput, 'This is my first project');
      const submitBtn = getByRole("button", { name: /create task/i });
      expect(submitBtn.getAttribute('data-changed')).toBe('true');
});

test('The status in the query parameter is used as the default status', async () => {
    mockUseRouter({
        query: {
            id: '1',
            status: '2'
        }
    });

    const {findByRole} = render(<AddTaskPage />);
    const currentStatus = await findByRole('button', {name: 'current-status'});
    expect(currentStatus.getAttribute('data-status')).toBe('2');

})