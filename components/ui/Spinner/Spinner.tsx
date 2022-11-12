import React from 'react';
import cn from 'classnames';

interface SpinnerProps {
    size?: 'sm'|'md'|'lg';
    className?: string;
}


const Spinner = ({size = 'md', className}: SpinnerProps) => {
    return (<div className={cn('relative rounded-full before:absolute before:inset-0 before:rounded-full before:border-2 before:border-gray-300 after:absolute after:inset-0 after:rounded-full after:border-2 after:border-transparent after:border-b-slate-700 after:animate-spin', {'w-4 h-4': size === 'sm', 'w-8 h-8': size === 'md', 'w-10 h-10': size === 'lg'}, className)} />)
}

export default Spinner;