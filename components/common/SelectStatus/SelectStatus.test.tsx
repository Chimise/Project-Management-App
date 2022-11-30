import "@testing-library/jest-dom";
import {
  render,
  user,
  waitForElementToBeRemoved
} from "../../../test/test-utils";
import router, { mockUseRouter, mockPush } from "../../../test/router";
import SelectStatus from './SelectStatus';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter();

test('That only the current status is displayed on render', async () => {
    const handler = jest.fn();
    const {getAllByRole} = render(<SelectStatus onChange={handler} status={1} />)
    const statusBtns = getAllByRole('button');
    expect(statusBtns).toHaveLength(1);
    expect(statusBtns[0]).toHaveAccessibleName('current-status');
})


test('All the status buttons are displayed when the current status button is clicked and that it is reversed when a status is selected', async () => {
    const handler = jest.fn();
    const {getByRole, getAllByRole} = render(<SelectStatus onChange={handler} status={0} />)
    const button = getByRole('button');

    user.click(button);

    await waitForElementToBeRemoved(button);
    const statusBtns = getAllByRole('button')
    expect(statusBtns).toHaveLength(3);

    user.click(statusBtns[2]);
    await waitForElementToBeRemoved(statusBtns[2]);
   

    expect(getAllByRole('button')).toHaveLength(1);
})

test('The selected status becomes the current status and that the onChange handler is called with the new status', async () => {
    const handler = jest.fn();
    const {getByRole, queryByRole} = render(<SelectStatus onChange={handler} status={1} />)
    const currentBtn = getByRole('button', {name: 'current-status'});

    await user.click(currentBtn);
    const completedStatusBtn = getByRole('button', {name: 'status-completed'});
    await user.click(completedStatusBtn);

    expect(queryByRole('button', {name: 'current-status'})).toBeInTheDocument()
    expect(handler).toHaveBeenCalledWith(2)
})

