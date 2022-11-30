import "@testing-library/jest-dom";
import {
  render,
  user,
  waitForElementToBeRemoved,
} from "../../../test/test-utils";
import router, { mockUseRouter, mockPush } from "../../../test/router";
import ProjectCard from "./ProjectCard";

const project = {
  id: 1,
  tasks: [],
  user_id: 1,
  created_at: new Date().toDateString(),
  updated_at: new Date().toISOString(),
  name: "New Project",
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter();

test("The a fade in text appears on hover and disappers on unhover", async () => {
  const { queryByText, container, getByText } = render(
    <ProjectCard project={project} />
  );
  expect(queryByText(/click to open/i)).not.toBeInTheDocument();
  await user.hover(container.firstElementChild!);
  const element = getByText(/click to open/i);

  expect(element).toBeInTheDocument();
  user.unhover(container.firstElementChild!);
  await waitForElementToBeRemoved(element);
});

test("The user goes to the add task page when clicked", async () => {
  const { container } = render(<ProjectCard project={project} />);
  await user.click(container.firstElementChild!);
  expect(mockPush).toHaveBeenCalled();
  expect(mockPush).toHaveBeenLastCalledWith("/dashboard/projects/1");
});
