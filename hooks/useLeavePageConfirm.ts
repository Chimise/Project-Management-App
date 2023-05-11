import {useEffect} from 'react';
import Router from 'next/router';

const useLeavePageConfirm = (isConfirm: boolean, message: string = 'You have unsaved changes, are you sure you want to leave?') => {
    useEffect(() => {
        const handler = (event: BeforeUnloadEvent) => {
            (event || window.event).returnValue = message;
            return message;
        }
        
        if(isConfirm) {
            window.addEventListener('beforeunload', handler);
        }
        
        return () => {
            window.removeEventListener('beforeunload', handler);
        }
    }, [isConfirm, message])

    useEffect(() => {
        const handler = () => {
            if(isConfirm && !window.confirm(message)) {
                throw 'Route cancelled';
            }
        }

        Router.events.on('beforeHistoryChange', handler);
        return () => {
            Router.events.off('beforeHistoryChange', handler);
        }
    }, [isConfirm, message]);
}

export default useLeavePageConfirm;