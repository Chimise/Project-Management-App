import React, {useState} from 'react';
import cn from 'classnames';
import TextBox from '../../ui/TextBox';
import Button from '../../ui/Button';
import { Comment } from '../CommentCard';

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
        const created_at = new Date().toISOString();
        const id = new Date(created_at).getTime();
        const updated_at = created_at;
        onAddComment({message: comment, favorite: false, like: false, created_at, id, updated_at});
        setIsVisible(false);
        setComment('');
    }

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            commentAddHandler();
        }
    }

    return (<div className='flex justify-start pl-5 lg:pl-7 pr-2'>
        {isVisible && <div className='flex flex-col space-y-3 md:flex-row items-end md:space-x-3'>
            <TextBox onKeyDown={keyDownHandler} error={false} value={comment} onChange={handleChange} className='border-b-gray-300 h-11 w-auto lg:w-72 border-0 focus:border-2 p-3' placeholder='Add A Comment' />
            <Button onClick={commentAddHandler} className='!font-extralight' type='button'>Comment</Button>
        </div>}
        {!isVisible && <div>
            <Button onClick={() => setIsVisible(true)} className='!font-extralight' type='button'>Add Comment</Button>
        </div>}
    </div>)
}

export default AddComment;