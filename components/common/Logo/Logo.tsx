import React from 'react';
import {Square3Stack3DIcon} from '@heroicons/react/24/outline';
import {motion} from 'framer-motion';

interface LogoProps {
    collapse: boolean;
}

const logoVariants = {
    initial: {
        opacity: 0
    },

}


const Logo = ({collapse}: LogoProps) => {
    return <div className='flex justify-center space-x-3 items-center overflow-hidden flex-nowrap'>
        <div className='inline-flex items-center justify-center rounded-full bg-teal-500 p-2'>
            <Square3Stack3DIcon className='w-7 h-7 text-white' />
        </div>
        {!collapse && <motion.h2 initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.4}}} className='text-teal-500 font-normal text-4xl font-sans'>track</motion.h2>}
    </div>
}

export default Logo;