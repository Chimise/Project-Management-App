import "@testing-library/jest-dom";
import {
  render,
} from "../../../test/test-utils";
import router, {
  mockUseRouter,
} from "../../../test/router";
import Layout from './Layout';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter();



test('It renders unchanged', () => {
    const {container} = render(<Layout>Hello</Layout>)
    expect(container.firstChild).toMatchSnapshot();
})
