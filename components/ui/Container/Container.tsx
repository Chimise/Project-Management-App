import React from 'react';

interface ContainerProps {
    children: React.ReactNode
}

const Container = ({children}: ContainerProps) => {
    return (<div className='w-[95%] mx-auto px-5'>
        {children}
    </div>)
}

export default Container;