import React from 'react';
import {Square3Stack3DIcon} from '@heroicons/react/24/outline';
import {motion} from 'framer-motion';
import {logoVariants} from '../../../animations';
import Badge from '../../ui/Badge';

interface LogoProps {
    collapse: boolean;
}


const Logo = ({collapse}: LogoProps) => {
    return <div className='flex justify-center space-x-3 items-center overflow-hidden flex-nowrap'>
        <Badge>
            <Square3Stack3DIcon className='w-7 h-7 text-white' />
        </Badge>
        {!collapse && <motion.h2 variants={logoVariants} initial="initial" animate="animate" className='text-primary font-medium text-4xl font-sans'>taskr</motion.h2>}
    </div>
}

export default Logo;