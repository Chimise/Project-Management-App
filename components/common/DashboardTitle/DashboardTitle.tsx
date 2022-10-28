import React from 'react';
import Badge from '../../ui/Badge';
import { icons } from '../NavLink';

interface DashboardTitleProps {
    icon: string;
    title: string;
}

const DashboardTitle = ({icon, title}: DashboardTitleProps) => {
    const Icon = icons[icon] || icons['dashboard'];
    return (
        <div className='flex items-center space-x-4'>
            <Badge>
                <Icon className='w-8 h-8 text-white' />
            </Badge>
            <h2 className='text-4xl font-semibold tracking-wide text-slate-800'>
                {title}
            </h2>
        </div>
    )
}

export default DashboardTitle;