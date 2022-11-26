import { useEffect } from "react";
import { sendRequest } from "../utils";
import useRequest from "./useRequest";
import useMessages, {UserMessage} from "./useMessages";

const viewMessage = async (id: number, token: string) => {
    const message = await sendRequest<UserMessage, null>({url: `/api/messages/${id}`, token, method: 'PATCH'});
    return message;
}

const useViewMessage = () => {
    const {data: message, error, sendRequest} = useRequest(viewMessage);
    const {mutate} = useMessages();
    useEffect(() => {
        if(message) {
            mutate(messages => {
                if(!messages) {
                    return;
                }
                const newMessages = [...messages];
                const messageIndex = messages.findIndex(data => data.id === message.id);
                if(messageIndex === -1) {
                    return newMessages;
                }
                newMessages[messageIndex] = message;
                return newMessages;
            }, false)
        }
    }, [message, mutate])

    return sendRequest;
}

export default useViewMessage;