import React from 'react';
import AddComment from '../AddComment';
import {EnvelopeOpenIcon} from '@heroicons/react/24/solid';
import {Status} from '../../../utils';
import CommentCard, {Comment} from '../CommentCard';

interface CommentListProps {
    comments: Array<Comment>;
    onAddComment: (comment: Comment) => void;
    onLikeComment: (id: number) => void;
    onAddFavorite: (id: number) => void;
    onRemoveComment: (id: number) => void;
    status: Status,
    name: string;
}

const CommentList = ({comments, onAddComment, onLikeComment, onRemoveComment, name, onAddFavorite, status}: CommentListProps) => {
    return <div className='space-y-4'>
        {comments.length === 0 && <div className='flex flex-col text-gray-700 items-center justify-evenly space-y-4'>
            <EnvelopeOpenIcon className='w-10 h-10' />
            <p>Looks like you have no comments!</p>
        </div>}

        {comments.length > 0 && <ul className='space-y-3'>
            {comments.map(comment => (<CommentCard name={name} onRemove={() => onRemoveComment(comment.id)} onAddFavourite={() => onAddFavorite(comment.id)} onLike={() => onLikeComment(comment.id)} key={comment.id} comment={comment} status={status} />))}
        </ul>}
        <AddComment onAddComment={onAddComment} />
    </div>
}

export default CommentList;