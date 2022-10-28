import React from 'react';
import cn from 'classnames';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string
}

const Badge = ({children, className, ...props}: BadgeProps) => {
    return (
        <div className={cn("inline-flex items-center justify-center rounded-full bg-primary p-2", className)} {...props} >
        {children}
      </div>
    )
}

export default Badge;