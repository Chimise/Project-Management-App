import React from 'react';
import cn from 'classnames';

interface PrimaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
    
}

const PrimaryCard = ({className, children, ...props}: PrimaryCardProps)  => {
    return (<div className={cn('border-t-[3px] border-slate-600 hover:border-primary transition-colors duration-200 hover:bg-teal-100/50 group', className)} {...props} >
        {children}
    </div>)
}

export default PrimaryCard;