import React from 'react';
import cn from 'classnames';

interface PrimaryCardProps extends React.HTMLAttributes<HTMLOrSVGElement> {
    as?: keyof JSX.IntrinsicElements
}

const PrimaryCard = ({className, as: Element = 'div', children, ...props}: PrimaryCardProps)  => {
    return (<Element className={cn('border-t-[3px] border-slate-600 hover:border-primary transition-colors duration-200 hover:bg-teal-100/50 group', className)} {...props} >
        {children}
    </Element>)
}

export default PrimaryCard;