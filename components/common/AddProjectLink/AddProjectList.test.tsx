import "@testing-library/jest-dom";
import AddProjectLink from "./AddProjectLink";
import { render, user } from "../../../test/test-utils";
import router, {mockUseRouter, mockPush} from '../../../test/router';

beforeEach(() => {
  jest.useFakeTimers();
  mockPush.mockClear();
  
});
afterEach(() => {
  jest.useRealTimers();
});

export const projects = [
  {
    id: 1,
    tasks: [],
    user_id: 1,
    created_at: new Date().toDateString(),
    updated_at: new Date().toISOString(),
    name: "Hello",
  },
];

const route = "/projects";

mockUseRouter({pathname: route, route});


describe("The add project link behaves properly when not collapsed", () => {
  test("Changes to the route on the href props when clicked by the user", async () => {
    const handler = jest.fn();
    const { getByText } = render(
      <AddProjectLink
        onAddProject={handler}
        projects={projects}
        href={route}
        collapsed={false}
        icon="project"
      >
        Click Me
      </AddProjectLink>
    );
    await user.click(getByText("Click Me"));
    expect(mockPush).toHaveBeenCalled();
  });

  test("Open the Disclosure and Ensure that the project is created when the submit button is clicked", async () => {
    const handler = jest.fn();
    const text = "My first project";
    const { findByPlaceholderText, getByRole, getAllByRole } = render(
      <AddProjectLink
        onAddProject={handler}
        projects={projects}
        href={route}
        collapsed={false}
        icon="project"
      >
        Click Me
      </AddProjectLink>
    );

    await user.click(getByRole("button"));

    const input = await findByPlaceholderText(/add project/i);
    expect(input).toBeInTheDocument();

    await user.type(input, text);
    const buttons = getAllByRole("button");

    await user.click(buttons[1]);

    expect(handler).toHaveBeenCalledWith({ name: text });
  });
});

describe("The add project behaves properly when it is collapsed", () => {
    // beforeEach(() => {
    //     mockFn.mockReset();
    // })
  test("The text is not visible and that it changes route when clicked", async () => {
    const handler = jest.fn();
    const { queryByText, getByTestId } = render(
      <AddProjectLink
        onAddProject={handler}
        projects={projects}
        href={route}
        collapsed={true}
        icon="project"
      >
        Click Me
      </AddProjectLink>
    );
    const link = queryByText("Click Me");
    expect(link).not.toBeInTheDocument();
    await user.click(getByTestId("disclosure-panel"));
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(route);
  });
});
