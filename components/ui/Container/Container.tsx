import React from 'react';
import cn from 'classnames';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}


const Container = ({children, className}: ContainerProps) => {
    return (<div className={cn('w-[95%] mx-auto px-5', className)}>
        {children}
    </div>)
}

export default Container;