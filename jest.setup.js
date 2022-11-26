import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import server from "../test/server";



beforeAll(() => {
  server.listen({
    onUnhandledRequest(req) {
      console.log(`Request ${req.url.pathname} ${req.method}`);
    },
  });
});

afterEach(() => {
  server.resetHandlers();
  jest.useRealTimers();
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  server.close();
  jest.restoreAllMocks();
});