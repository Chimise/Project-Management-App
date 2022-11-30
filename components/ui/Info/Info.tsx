import React from 'react';
import {motion, MotionProps} from 'framer-motion';
import cn from 'classnames';

interface InfoProps extends MotionProps {
    className?: string;
    type: 'report' | 'message';
    value: number;

}

const Info = ({type, value, className, ...props}: InfoProps) => {
    const views = value > 0;
    return (<motion.div role='alert' aria-label={`${type}-alert`} className={cn('py-2 px-4 text-sm inline-block rounded-full', {'bg-primary text-white': views, 'bg-gray-200 text-gray-800': !views}, className)} {...props} >
        You have {value} new {type}{value > 1 ? 's' : ''}
    </motion.div>)
}

export default Info;