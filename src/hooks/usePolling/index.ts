import React from 'react';
import FetchAdapter from '@services/FetchAdapter';
import { makeCancelable } from '@toolkit/helperUtils';

type Options<T> = {
    interval: number;
    isPolling?: boolean;
}
type Tick = null | (() => void);

interface Return<T> {
    data: null | T;
    error: null | Error;
}
const usePolling = <T>(opts: Options<T>, api: string, args?: any): Return<T> => {
    const [data, setPromiseData] = React.useState<T | null>(null);
    const [error, setError] = React.useState<null | Error>(null);
    const previousCall = React.useRef<null | Cancelable<T>>(null);
    const timerId = React.useRef<any>(null);
    const ticker = React.useRef<Tick>(null);


    const cancelTimer = (): void => {
        if (timerId.current) {
            clearTimeout(timerId.current);
        }
    };


    const tick = (): void => {
        previousCall.current = makeCancelable<T>(FetchAdapter.call(api, args));
        previousCall.current.promise
            .then(resp => {
                setPromiseData(resp);
                timerId.current = setTimeout(() => {
                    if (ticker.current) {
                        ticker.current();
                    }
                }, opts.interval);
            })
            .catch(err => {
                setError(err);
                cancelTimer();
            });
    };

    React.useEffect(() => {
        ticker.current = tick;
    });


    const cancelCurrentPromise = (): void => {
        if (previousCall.current && previousCall.current.isCancelable === true) {
            if (previousCall.current.pending()) {
                previousCall.current.cancel();
            }
        }
    };


    React.useEffect(() => {
        if (ticker.current) {
            if (opts.isPolling) {
                ticker.current();
            } else {
                cancelCurrentPromise();
                cancelTimer();
            }
        }
        return (): void => {
            cancelCurrentPromise();
            cancelTimer();
        };
    }, [opts.isPolling]);

    return {
        data,
        error,
    };
};

export default usePolling;
