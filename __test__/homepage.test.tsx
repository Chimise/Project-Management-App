import HomePage from '../pages';
import {render} from '../test/test-utils';
import router, {mockUseRouter, mockPush} from '../test/router';


Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
})


mockUseRouter();

test('renders the homepage unchanged', () => {
    const {container} = render(<HomePage />);
    expect(container.firstChild).toMatchSnapshot();
})

