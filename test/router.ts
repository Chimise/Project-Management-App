import router from 'next/router';
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

export const mockPush = jest.fn();
export const mockReplace = jest.fn();
export const mockBack = jest.fn();

export function mockUseRouter ({route = '', pathname = '', query = {}, asPath = ''}: {route?: string, pathname?: string , query?: object , asPath?: string} = {}) {
    useRouter.mockImplementation(() => ({
        route: route,
        pathname: pathname,
        query: query,
        asPath: asPath,
        back: mockBack,
        replace: mockReplace,
        push: mockPush
    }))
}

export default useRouter;