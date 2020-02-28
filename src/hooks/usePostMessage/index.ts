import React from 'react';
import ParentWindowAdapter, { ChildMessage } from '../../services/ParentWindowAdapter';


type PostCall<T> = (messageType: string, data: T) => void

type Response<T> = [ChildMessage<T> | null, PostCall<T>]

const usePostMessage = <T>(type: string, message?: T): Response<T> => {
    const [lastMessage, setMessage] = React.useState<ChildMessage<T> | null>(null);
    const postMessage = (messageType: string, data: T): void => {
        const childMessage: ChildMessage<T> = {
            type: messageType,
            message: data,
        };
        setMessage(childMessage);
        ParentWindowAdapter.postMessageAll(childMessage);
    };
    React.useEffect(() => {
        if (message) {
            postMessage(type, message);
        }
    }, [message, type]);
    return [lastMessage, postMessage];
};

export default usePostMessage;
