import React from 'react';
import {Comment} from '../../../store/TaskContext/TaskContext';
import AddComment from '../AddComment';
import {EnvelopeOpenIcon} from '@heroicons/react/24/solid';
import {Status} from '../../../utils';
import CommentCard from '../CommentCard';

interface CommentListProps {
    comments: Array<Comment>,
    onAddComment: React.Dispatch<React.SetStateAction<Comment[]>>,
    status: Status
}

const CommentList = ({comments, onAddComment, status}: CommentListProps) => {
    const addCommentHandler = (comment: Comment) => {
        onAddComment(prevComments => {
            return [comment, ...prevComments]
        });
    }

    const likeCommentHandler = (id: string) => {
        const commentIndex = comments.findIndex(comment => comment.id === id);
        if(commentIndex === -1) {
            return;
        }
        const newComments = [...comments];
        newComments[commentIndex] = {
            ...newComments[commentIndex],
            like: true
        }
        onAddComment(newComments);
    }

    const favouriteCommentHandler = (id: string) => {
        const commentIndex = comments.findIndex(comment => comment.id === id);
        if(commentIndex === -1) {
            return;
        }
        const newComments = [...comments];
        newComments[commentIndex] = {
            ...newComments[commentIndex],
            favourite: true
        }
        onAddComment(newComments);
    }

    const removeCommentHandler = (id: string) => {
        onAddComment(prevComments => {
            return prevComments.filter(comment => comment.id !== id);
        })
    }

    return <div className='space-y-4'>
        {comments.length === 0 && <div className='flex flex-col text-gray-700 items-center justify-evenly space-y-4'>
            <EnvelopeOpenIcon className='w-10 h-10' />
            <p>Looks like you have no comments!</p>
        </div>}

        {comments.length > 0 && <ul className='space-y-3'>
            {comments.map(comment => (<CommentCard onRemove={() => removeCommentHandler(comment.id)} onAddFavourite={() => favouriteCommentHandler(comment.id)} onLike={() => likeCommentHandler(comment.id)} key={comment.id} comment={comment} status={status} />))}
        </ul>}
        <AddComment onAddComment={addCommentHandler} />
    </div>
}

export default CommentList;