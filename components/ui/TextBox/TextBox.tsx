import React from 'react';
import cn from 'classnames';

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error: boolean;
}

const TextBox = ({className, error, ...props}: TextBoxProps) => {
    return (<input autoComplete='off' autoCorrect='off' className={cn('inline-block py-1.5 focus:ring-0 focus:rounded-md border-transparent focus:outline-none border-2 focus:border-blue-900', {'placeholder-gray-600': !error, 'placeholder-red-800': error}, className)} {...props} />)
}

export default TextBox;