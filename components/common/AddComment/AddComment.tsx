import React, {useState} from 'react';
import cn from 'classnames';
import TextBox from '../../ui/TextBox';
import Button from '../../ui/Button';
import { Comment } from '../../../store/TaskContext/TaskContext';
import {generateId} from '../../../utils'

interface AddCommentProps {
    onAddComment: (comment: Comment) => void;
}

const AddComment = ({onAddComment}: AddCommentProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [comment, setComment] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    }

    const commentAddHandler = () => {
        if(comment.trim().length === 0) {
            return;
        }
        const id = generateId();
        const createdAt = new Date().toISOString();
        onAddComment({message: comment, id, favourite: false, like: false, createdAt});
        setIsVisible(false);
        setComment('');
    }

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            commentAddHandler();
        }
    }

    return (<div className='flex justify-start pl-5 lg:pl-7 pr-2'>
        {isVisible && <div className='flex items-end space-x-3'>
            <TextBox onKeyDown={keyDownHandler} error={false} value={comment} onChange={handleChange} className='border-b-gray-300 h-11 w-auto lg:w-72 border-0 focus:border-2 p-3' placeholder='Add A Comment' />
            <Button onClick={commentAddHandler} className='!font-extralight' type='button'>Comment</Button>
        </div>}
        {!isVisible && <div>
            <Button onClick={() => setIsVisible(true)} className='!font-extralight' type='button'>Add Comment</Button>
        </div>}
    </div>)
}

export default AddComment;