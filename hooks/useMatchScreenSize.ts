import {useState, useEffect} from 'react';

type ScreenSizes = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type Sizes = {
    [Key in ScreenSizes]: string;
}
const sizes: Sizes = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
}

const useMatchScreenSize = (screenSize: ScreenSizes = 'sm') => {
    const [match, setMatch] = useState(false);
    const query = `(min-width: ${sizes[screenSize]})`
    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatch(mediaQuery.matches);
        const listener = (event: MediaQueryListEvent) => {
            setMatch(event.matches);
        }
        mediaQuery.addEventListener('change', listener, false);
        return () => {
            mediaQuery.removeEventListener('change', listener);
        }
    }, [query]);

    return match;
}

export default useMatchScreenSize;