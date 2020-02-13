import React from 'react';
import FetchAdapter from '@services/FetchAdapter';

type Callback = (s: any) => Cancelable<any>;
type Events = string | string[];

const useApiSubscribe = <T extends any>(events: Events, cb: T): void => {
    const callbackRef = React.useRef(cb);
    const previousCall = React.useRef<null | Cancelable<any>>(null);

    const cancelIfCancelable = (): void => {
        if (previousCall.current && previousCall.current.isCancelable) {
            if (previousCall.current.pending()) {
                previousCall.current.cancel();
            }
        }
    };
    React.useEffect(() => {
        callbackRef.current = cb;
    });
    React.useEffect(() => {
        function subscription(data: string): void {
            cancelIfCancelable();
            previousCall.current = callbackRef.current(data);
        }
        FetchAdapter.subscribe(events, subscription);
        return (): void => {
            cancelIfCancelable();
            FetchAdapter.unSubscribe(events, subscription);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useApiSubscribe;
