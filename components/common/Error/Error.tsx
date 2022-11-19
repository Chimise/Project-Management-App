import React from 'react';
import cn from 'classnames';

interface ErrorProps {
    message?: string;
    onRetry: () => void;
    className?: string
}

const Error = ({message, onRetry, className}: ErrorProps) => {
    return <div className={cn('w-full flex flex-col justify-center items-center space-y-4', className)}>
        <p className='text-sm text-gray-700 text-light'>{message ? message : 'An error occured, please try again'}</p>
        <button onClick={onRetry} className='py-2 px-3 rounded-md bg-black/70 focus:ouline-none hover:bg-black'>Retry</button>
    </div>
}

export default Error;