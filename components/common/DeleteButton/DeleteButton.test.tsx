import "@testing-library/jest-dom";
import {
  render,
  user,
  waitFor,
  waitForElementToBeRemoved,
} from "../../../test/test-utils";
import router, {
  mockUseRouter,
} from "../../../test/router";
import DeleteButton from  './DeleteButton';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter();

test('Test that the confirm and the cancel buttons appears when the delete button is clicked, and that the delete button disappears', async () => {
    const handler = jest.fn();
    expect.assertions(2);
    const {getByRole} = render(<DeleteButton onConfirm={handler} />)
    const deleteBtn = getByRole('button', {name: /delete/i});
    user.click(deleteBtn);
    await waitForElementToBeRemoved(deleteBtn);
    await waitFor(() => {
        expect(getByRole('button', {name: /confirm/i})).toBeInTheDocument();
        expect(getByRole('button', {name: /cancel/i})).toBeInTheDocument();
    })
});

test('That the confirm handler is called when the confirm button is clicked', async () => {
    const handler = jest.fn();
    const {getByRole} = render(<DeleteButton onConfirm={handler} />)
    await user.click(getByRole('button', {name: /delete/i}));
    await user.click(getByRole('button', {name: /confirm/i}));
    expect(handler).toHaveBeenCalled();
})

test('That the delete button state is reset when the cancel button is pressed', async () => {
    const handler = jest.fn();
    const {getByRole, queryByRole} = render(<DeleteButton onConfirm={handler} />)
    await user.click(getByRole('button', {name: /delete/i}));
    const confirmBtn = getByRole('button', {name: /confirm/i});
    const cancelBtn = getByRole('button', {name: /cancel/i});

    expect(confirmBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();

    user.click(cancelBtn)
    await waitFor(() => {
        expect(queryByRole('button', {name: /confirm/i})).not.toBeInTheDocument();
        expect(queryByRole('button', {name: /cancel/i})).not.toBeInTheDocument();
    })
    expect(getByRole('button', {name: /delete/i})).toBeInTheDocument();
})



