import {render, user, waitForElementToBeRemoved} from '../../../test/test-utils'
import AddComment from "./AddComment";
import router, {mockUseRouter, mockPush} from '../../../test/router';
import '@testing-library/jest-dom';


beforeEach(() => {
    jest.useFakeTimers()
    mockPush.mockClear();
})
afterEach(() => {
    jest.useRealTimers();
})

mockUseRouter()


test('Show the input and check that the callback is called when the comment is added', async () => {
    const handler = jest.fn();
    const {getByRole, getByPlaceholderText} = render(<AddComment onAddComment={handler} />)

    const addComment = getByRole('button', {name: 'Add Comment'});
    user.click(addComment)
    await waitForElementToBeRemoved(addComment);
    
    const input = getByPlaceholderText(/add a comment/i);
    const words = 'Hello There'
    expect(input).toBeInTheDocument();
    
    await user.type(input, words);
    await user.click(getByRole('button', {name: 'Comment'}));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].message).toBe(words);
})

test('Check if the input submits when the enter button is pressed', async () => {
    const handler = jest.fn();
    const {getByRole, getByPlaceholderText} = render(<AddComment onAddComment={handler} />)
    
    await user.click(getByRole('button', {name: 'Add Comment'}));
    const input = getByPlaceholderText(/add a comment/i);
    await user.type(input, 'hello');
    
    await user.type(input, '{Enter}');

    expect(handler).toHaveBeenCalledTimes(1);

})