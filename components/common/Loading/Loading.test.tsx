import "@testing-library/jest-dom";
import {
  render,
} from "../../../test/test-utils";
import router, {
  mockUseRouter,
} from "../../../test/router";
import Loading from './Loading';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter();



test('It renders unchanged', () => {
    const {container} = render(<Loading />)
    expect(container.firstChild).toMatchSnapshot();
})
