import "@testing-library/jest-dom";
import {
  render,
  user,
  waitForElementToBeRemoved
} from "../../../test/test-utils";
import router, { mockUseRouter, mockPush } from "../../../test/router";
import InputField from './InputField';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter();

test('It displays an error message when there is an error and displays nothing when there is no error', async () => {
    const {getByLabelText, rerender} = render(<InputField error={true} message='An error occured' label="Name" />)
    const input = getByLabelText(/name/i);
    expect(input).toHaveErrorMessage(/an error occured/i);
    rerender(<InputField error={false} label="Name" />);
    expect(input).not.toHaveErrorMessage();
})

test('It displays a view password button when it is of type password and the clicking the button makes the password visible', async () => {
    const {getByLabelText, getByRole} = render(<InputField label='Password' type='password' error={false} />);
    const input = getByLabelText(/password/i, {selector: 'input'}) as HTMLInputElement;
    expect(input.type).toBe('password');
    const viewPasswordButton = getByRole('button', {name: 'view-password'});
    expect(viewPasswordButton).toBeInTheDocument();
    await user.click(viewPasswordButton)
    expect(input.type).toBe('text');
});