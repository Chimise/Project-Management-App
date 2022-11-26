import useSWR from 'swr';
import useAuth from './useAuth';
import RequestError from '../utils/RequestError';
import {UserMessageSchema, Message} from '../models/UserMessage';

export type UserMessage = Omit<UserMessageSchema, 'message_id'> & {
    message: Message
}

const useMessages = () => {
    const {token} = useAuth();
    const {data: messages, error, mutate} = useSWR<UserMessage[], RequestError>(token && ['/api/messages', token]);
    return {
        messages,
        error: messages ? undefined : error,
        mutate,
        isLoading: !messages && !error,
        unRead: !messages ? undefined : messages.filter(message => message.viewed === false).length
    }
}

export default useMessages;