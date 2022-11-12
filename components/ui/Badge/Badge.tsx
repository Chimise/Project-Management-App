import React from 'react';
import cn from 'classnames';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string
    color?: string;
}

const Badge = ({children, color='bg-primary', className, ...props}: BadgeProps) => {
    return (
        <div className={cn("inline-flex items-center justify-center rounded-full p-2", className, color)} {...props} >
        {children}
      </div>
    )
}

export default Badge;