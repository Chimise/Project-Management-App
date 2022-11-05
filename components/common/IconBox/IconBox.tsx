import React from 'react';
import {Icons, icons, Status} from '../../../utils';
import cn from 'classnames';

interface IconBoxProps {
    value: string | number;
    status: Status;
    className?: string
};

type StatusIcon = {
    [Key in Status]: Icons;
}

const iconName: StatusIcon = {
    0: 'created',
    1: 'progress',
    2: 'completed'
}


const IconBox = ({value, status, className}: IconBoxProps) => {
    const Icon = icons[iconName[status]];
    return <span className={cn('inline-flex items-center space-x-1.5', {'text-primary': status == 0, 'text-progress': status == 1, 'text-completed': status === 2}, className)}>
        <Icon className={cn('w-6 h-6 md:w-8 md:h-8')} />
        <span>{value}</span>
    </span>
};

export default IconBox;