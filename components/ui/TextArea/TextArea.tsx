import React from 'react';
import cn from 'classnames';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error: boolean;
}

const TextArea = ({className, error, rows = 5, ...props}: TextAreaProps) => {
    return (<textarea rows={rows} className={cn('inline-block py-1.5 focus:ring-0 rounded-md focus:outline-none border-2 border-transparent focus:border-blue-900', {'placeholder-gray-600': !error, 'placeholder-red-800': error}, className)} {...props}></textarea>)
}

export default TextArea;