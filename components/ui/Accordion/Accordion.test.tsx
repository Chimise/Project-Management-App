import "@testing-library/jest-dom";
import {
  render,
  user,
  waitForElementToBeRemoved
} from "../../../test/test-utils";
import router, { mockUseRouter, mockPush } from "../../../test/router";
import Accordion from "./Accordion";
import {EnvelopeIcon} from '@heroicons/react/20/solid'

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter();
const handler = jest.fn();
const children = <span data-testid='child' >This is only visible when the accordion is clicked</span>
const title = 'This is an accordion';
test('It renders unchanged', () => {
    const {container} = render(<Accordion openIcon={EnvelopeIcon} title={title} onView={handler} viewed={false} >{children}</Accordion>);
    expect(container.firstChild).toMatchSnapshot();
})

test('It shows a slide text on hover which disappears on unhover', async () => {
    const {getByRole, getByText} = render(<Accordion openIcon={EnvelopeIcon} title={title} onView={handler} viewed={false} >{children}</Accordion>);
    const accordion = getByRole('button');
    await user.hover(accordion);
    const slideText = getByText(/click to open/i);
    expect(slideText).toBeInTheDocument();
    user.unhover(slideText);
    await waitForElementToBeRemoved(slideText);
});

test('The child element displays when the accordion is clicked and the onView callback is also called', async () => {
    const {getByRole, queryByTestId, getByTestId} = render(<Accordion openIcon={EnvelopeIcon} title={title} onView={handler} viewed={false} >{children}</Accordion>);
    const accordion = getByRole('button');
    expect(queryByTestId('child')).not.toBeInTheDocument();
    await user.click(accordion);
    const child = getByTestId('child');
    expect(child).toBeInTheDocument();
    expect(handler).toHaveBeenCalledTimes(1);
    user.click(accordion);
    await waitForElementToBeRemoved(child);
});