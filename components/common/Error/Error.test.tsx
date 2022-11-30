import "@testing-library/jest-dom";
import {
  render,
  user,
} from "../../../test/test-utils";
import router, {
  mockUseRouter,
} from "../../../test/router";
import Error from './Error';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter();

test('The error messages is displayed correctly', () => {
    const error = 'An error occured'
    const handler = jest.fn();
    const {getByText} = render(<Error onRetry={handler} message={error} /> );
    expect(getByText(error)).toBeInTheDocument();
})

test('Check that a default error message is shown', () => {
    const handler = jest.fn();
    const {getByText} = render(<Error onRetry={handler} />);
    expect(getByText(/error/i)).toBeInTheDocument();
})

test('The onretry handler is called when the retry button is clicked', async () => {
    const handler = jest.fn();
    const {getByRole} = render(<Error onRetry={handler} />);
    await user.click(getByRole('button', {name: 'Retry'}));
    expect(handler).toHaveBeenCalled();
})

test('It renders unchanged', () => {
    const handler = jest.fn();
    const {container} = render(<Error onRetry={handler} />);
    expect(container.firstChild).toMatchSnapshot();
})