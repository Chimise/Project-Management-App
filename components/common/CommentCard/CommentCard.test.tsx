import "@testing-library/jest-dom";
import { user, render } from "../../../test/test-utils";
import router, { mockUseRouter, mockPush } from "../../../test/router";
import CommentCard, {Comment} from "./CommentCard";

const mockFavoriteHandler = jest.fn();
const mockLikeHandler =  jest.fn();
const mockDeleteHandler = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
})

afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter();

const comment: Comment = {
    id: 1,
    message: 'My first comment',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    favorite: true,
    like: false
}

test("That the children is only visible if the user is authenticated", async () => {
  const { getAllByRole } = render(<CommentCard status={0} name='Chimise' comment={comment} onAddFavourite={mockFavoriteHandler} onLike={mockLikeHandler} onRemove={mockDeleteHandler} />);
  const buttons = getAllByRole('button', {hidden: true});
  await user.click(buttons[0]);
  expect(mockLikeHandler).toHaveBeenCalled();
  await user.click(buttons[1]);
  expect(mockFavoriteHandler).toHaveBeenCalled()
  await user.click(buttons[2]);
  expect(mockDeleteHandler).toHaveBeenCalled();
});

