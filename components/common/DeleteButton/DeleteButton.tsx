import React, {useState} from 'react';
import Badge from '../../ui/Badge';
import {TrashIcon, CheckIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {motion, useSpring, useMotionValue} from 'framer-motion';

interface DeleteButtonProps {
    onConfirm: () => void;
}


const DeleteButton = ({onConfirm}: DeleteButtonProps) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const scale = useMotionValue(1);
    const scaleX = useSpring(scale, {
        stiffness: 100,
        damping: 10,
        
    })
    const clickHandler = () => {
        setShowConfirm(true);
    }
    return (
        <div>
            {!showConfirm && <Badge role='button' aria-label='delete-button' color='bg-gray-100' onClick={clickHandler} className='group hover:bg-transparent'>
                <TrashIcon className='w-5 h-5 stroke-2 transition-all duration-150 stroke-gray-800 group-hover:scale-125 group-hover:stroke-red-700' />
                </Badge>}
            {showConfirm && <div className='space-y-1.5'>
                <motion.div className='origin-top-right h-2 rounded-md w-full bg-red-500' style={{scaleX}} />
                <div className='flex space-x-2'>
                    <Badge role='button' aria-label='confirm-button' onClick={onConfirm} className='group hover:bg-transparent' color='bg-gray-100' onMouseEnter={() => scale.set(0.8)} onMouseLeave={() => scale.set(1)}>
                        <CheckIcon className='w-5 h-5 stroke-2 transition-all duration-150 stroke-gray-800 group-hover:scale-125 group-hover:stroke-red-700' />
                    </Badge>
                    <Badge role='button' aria-label='cancel-button' className='group hover:bg-transparent' onClick={() => setShowConfirm(false)} color='bg-gray-100'>
                        <XMarkIcon className='w-5 h-5 stroke-2 transition-all duration-150 stroke-gray-800 group-hover:scale-125 group-hover:stroke-red-700' />
                    </Badge>
                </div>
                </div>}
        </div>
    )
}

export default DeleteButton;