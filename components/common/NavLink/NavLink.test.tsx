import "@testing-library/jest-dom";
import { render} from "../../../test/test-utils";
import router, { mockUseRouter} from "../../../test/router";
import NavLink from './NavLink';


beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

mockUseRouter({pathname: '/dashboard'});

test('The link text is visible when it is not collapsed and not visible when collapsed', async () => {
    const {queryByText, rerender} = render(<NavLink href='/dashboard' collapsed={false} icon='dashboard'>Dashboard</NavLink>)
    const text = queryByText('Dashboard');
    expect(text).toBeInTheDocument();
    rerender(<NavLink href='/dashboard' collapsed={true} icon='dashboard'>Dashboard</NavLink>)
    expect(queryByText('Dashboard')).not.toBeInTheDocument();
})

test('The link is the current link when the the href prop is the same as the browser path', () => {
    const {getByRole} = render(<NavLink href='/dashboard' collapsed={false} icon='dashboard'>Dashboard</NavLink>)
    const link = getByRole('link', {name: /dashboard/i});
    expect(link.getAttribute('data-current')).toBe("true");

})

test('The link is the not the current link when the href prop is not the same as the browser path', () => {
    mockUseRouter({pathname: '/project'});
    const {getByRole} = render(<NavLink href='/dashboard' collapsed={false} icon='dashboard'>Dashboard</NavLink>)
    const link = getByRole('link', {name: /dashboard/i});
    expect(link.getAttribute('data-current')).toBe("false");
})

test('The pill content is visible when it is provided', () => {
    const {getByRole} = render(<NavLink href='/dashboard' collapsed={false} pillContent={2} icon='dashboard'>Dashboard</NavLink>)
    const pill = getByRole('presentation', {name: /pill/i});
    expect(pill).toHaveTextContent('2');
})

test('The pill content is not visible when not it is provided', () => {
    const {getByRole} = render(<NavLink href='/dashboard' collapsed={false} icon='dashboard'>Dashboard</NavLink>)
    const pill = getByRole('presentation', {name: /pill/i});
    expect(pill).toHaveTextContent('');
})

