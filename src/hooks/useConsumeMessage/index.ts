import React from 'react';
import ChildWindowAdapter, { CallbackSubscriptions } from '@services/ChildWindowAdapter';


const useConsumeMessage = <T>(type: string, callback?: CallbackSubscriptions): T | null => {
    const [data, setData] = React.useState<T | null>(null);
    const callbackRef = React.useRef(callback);

    React.useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    React.useEffect(() => {
        const subscription = (message: any): void => {
            if (callbackRef.current) {
                callbackRef.current(message);
            }
            setData(message);
        };
        ChildWindowAdapter.subscribe(type, subscription);
        return (): void => {
            ChildWindowAdapter.unSubscribe(type, subscription);
        };
    }, [type]);

    return data;
};

export default useConsumeMessage;
