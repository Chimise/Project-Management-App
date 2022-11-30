import cn from 'classnames';
import React, {useState} from 'react';
import { Status, icons, Icons } from '../../../utils';
import Badge from '../../ui/Badge'

interface SelectStatusProps {
    status: Status;
    onChange: React.Dispatch<React.SetStateAction<Status>>;
}

type IconNames = {
    [Key in Status]: Icons;
}

const iconNames: IconNames = {
    0: 'created',
    1: 'progress',
    2: 'completed'
}

const statuses: Status[] = [0, 1, 2];

const SelectStatus = ({status, onChange}: SelectStatusProps) => {
    const Icon = icons[iconNames[status]];
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(true);
    }

    const changeStatusHandler = (status: Status) => {
        onChange(status);
        setIsVisible(false);
    }

    return <div>
        {isVisible && <div className='flex space-x-2'>
            {statuses.map(status => {
                const Icon = icons[iconNames[status]];
                return <Badge role='button' aria-label={`status-${iconNames[status]}`} onClick={() => changeStatusHandler(status)} color={cn({'bg-primary': status === 0, 'bg-progress': status === 1, 'bg-completed': status === 2})} key={status}>
                    <Icon className='text-white h-5 w-5 md:h-7 md:w-7' />
                </Badge>
            })}
            </div>}
        {!isVisible && <Badge role='button' aria-label={`current-status`} data-status={status}  onClick={handleClick} color={cn({'bg-primary': status === 0, 'bg-progress': status === 1, 'bg-completed': status === 2})}>
            <Icon className='text-white h-5 w-5 md:h-7 md:w-7' />
            </Badge>}
    </div>
}

export default SelectStatus;