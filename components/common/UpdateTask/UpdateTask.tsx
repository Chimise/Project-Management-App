import React, {useState, useEffect} from 'react';
import cn from 'classnames';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import DeleteButton from '../../../components/common/DeleteButton';
import TextBox from '../../../components/ui/TextBox';
import TextArea from '../../../components/ui/TextArea';
import SelectStatus from '../../../components/common/SelectStatus';
import CommentList from '../../../components/common/CommentList';
import {ProjectSchema} from '../../../models/Project';
import { Task } from '../../../hooks/useAddTask';
import type {Status} from '../../../utils';
import type { Comment } from '../CommentCard';
import useAddComment from '../../../hooks/useAddComment';
import useUpdateComment from '../../../hooks/useUpdateComment';
import useRemoveComment from '../../../hooks/useRemoveComment';
import useUpdateTask from '../../../hooks/useUpdateTask';
import useRemoveTask from '../../../hooks/useRemoveTask';
import useUser from '../../../hooks/useUser';
import useLeavePageConfirm from '../../../hooks/useLeavePageConfirm';

interface UpdateTaskProps {
    project: ProjectSchema;
    task: Task;

}

const UpdateTask = ({project, task}: UpdateTaskProps) => {
    const [status, setStatus] = useState<Status>(task.status as Status);
    const [hasChanged, setHasChanged] = useState(false);
    const {firstName, user} = useUser();
    const addComment = useAddComment();
    const updateComment = useUpdateComment();
    const removeComment = useRemoveComment();
    const updateTask = useUpdateTask();
    const removeTask = useRemoveTask();
    useLeavePageConfirm(hasChanged);


    const addCommentHandler = async (comment: Comment) => {
        await addComment({...comment, task_id: task.id, project_id: project.id});
    }

    const likeCommentHandler = async (id: number) => {
        const comment = task.comments.find(comment => comment.id === id);
        console.log(comment);
        if(!comment) {
            return;
        }
        await updateComment({id, task_id: task.id, project_id: project.id, like: !comment.like});
    }
    const favoriteCommentHandler = async (id: number) => {
        const comment = task.comments.find(comment => comment.id === id);
        console.log(comment);
        if(!comment) {
            return;
        }
        await updateComment({id, task_id: task.id, project_id: project.id, favorite: !comment.favorite});
    }

    const removeCommentHandler = async (id: number) => {
        await removeComment({id, projectId: project.id, taskId: task.id});
    }

    const {values, handleSubmit, handleBlur, handleChange, isSubmitting, touched, errors} = useFormik({initialValues: {
        name: task.name,
        description: task.description,
        tag: task.tag
    }, onSubmit: async (values) => {
        await updateTask({...values, project_id: project.id, id: task.id, status});
        
    }, validationSchema: Yup.object({
        name: Yup.string().required(),
        description: Yup.string().required(),
        tag: Yup.string().required()
    })});

    useEffect(() => {
        let changed = false;
        if(values.name !== task.name) {
            changed = true;
        }
        if(values.description !== task.description) {
            changed = true;
        }
        if(values.tag !== task.tag) {
            changed = true;
        }
        if(status !== task.status) {
            changed = true;
        }
        setHasChanged(changed);
    }, [task, values, status])


    return (<form onSubmit={handleSubmit} className='mt-1'>
    <div className='flex space-x-6 items-center' >
        <TextBox className='flex-1 placeholder:text-2xl text-2xl md:placeholder:text-4xl md:text-4xl placeholder:font-normal text-slate-900 font-medium' placeholder='Enter Task name' error={Boolean(touched.name && errors.name)} name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} />
        <DeleteButton onConfirm={() => removeTask({taskId: task.id, projectId: project.id})} />
    </div>
    <p className="text-sm md:text-base text-gray-600 mt-2">Created by <span className='text-gray-800 font-medium'>{firstName ? firstName : ''}</span> on {moment(project.created_at).format('dddd D MMMM, YYYY')} at {moment(project.created_at).format('HH:ss')}</p>
    <div className={cn('flex items-center justify-between font-bold mt-3', {'text-primary': status === 0, 'text-progress': status === 1, 'text-completed': status === 2})}>
        <div className='flex items-center space-x-1'>
        <span className='text-xl'>#</span>
        <TextBox placeholder='Add Tag...' className='uppercase placeholder:font-normal' value={values.tag} error={Boolean(touched.tag && errors.tag)} name='tag' onChange={handleChange} onBlur={handleBlur} />
        </div>
        <div className='inline-flex space-x-2 items-center'>
            <span className='text-black font-medium'>
                Status:
            </span>
            <SelectStatus status={status} onChange={setStatus} />
        </div>
    </div>
    <TextArea name='description' placeholder='Add Description...' className='w-full p-0 text-gray-800 mt-2' rows={2} value={values.description} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.description && errors.description)} />
    <div className='mt-2'>
        <p className='text-lg lg:text-xl font-medium mb-5'>Comments ({task.comments.length})</p>
        <CommentList name={user ? user.name : ''} comments={task.comments} onAddComment={addCommentHandler} onAddFavorite={favoriteCommentHandler} onLikeComment={likeCommentHandler} onRemoveComment={removeCommentHandler} status={status} />
    </div>
    <div className='flex justify-end mt-5'> 
        <button type='submit' data-changed={hasChanged} disabled={isSubmitting} className={cn('px-3 py-2 rounded-lg transition-all duration-300 font-medium shadow-sm uppercase focus:outline-none hover:shadow-md', {'bg-gray-300 text-gray-800 hover:bg-gray-400/60': !hasChanged, 'bg-gray-600 text-white hover:bg-gray-800': hasChanged})}>Update Task</button>
    </div>
  </form>)
}

export default UpdateTask;