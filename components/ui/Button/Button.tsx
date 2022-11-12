import React from 'react';
import cn from 'classnames';
import {PlusIcon} from '@heroicons/react/20/solid'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button = ({className, children, ...props}: ButtonProps) => {
    return <button className={cn('bg-black text-white/80 hover:text-white transition-colors duration-150 items-center focus:outline-none text-base md:text-lg font-medium inline-flex p-2', className)} {...props}>
        <span className='shrink-0 w-5 h-5 md:w-6 lg:h-6'><PlusIcon className='w-full h-full' /></span><span>{children}</span>
    </button>
}

export default Button;