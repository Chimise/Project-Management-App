import '@testing-library/jest-dom';
import {render, user} from '../../../test/test-utils';
import ProjectList from "./ProjectList";
import router, {mockUseRouter, mockPush} from '../../../test/router';

beforeEach(() => {
  jest.useFakeTimers();
  mockPush.mockClear();
  
});
afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter();


const project = {
    id: 1,
    tasks: [],
    user_id: 1,
    created_at: new Date().toDateString(),
    updated_at: new Date().toISOString(),
    name: "New Project"
}

test('Checks that the project list components remains unchanged', () => {
    const {container} = render(<ProjectList project={project} onClick={jest.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
})

test('Checks that the projects render properly and clicking the project redirects the user', async () => {
    const handler = jest.fn(() => mockPush('/projects/1'));
    const {container} = render(<ProjectList project={project} onClick={handler} />)
    await user.click(container.firstElementChild!);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/projects/1');
});

test('The project name is rendered appropriately', () => {
  const {getByText} = render(<ProjectList project={project} onClick={jest.fn()} />)
  const projectName = getByText('New Project');
  expect(projectName).toBeInTheDocument();
})