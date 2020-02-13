import React from 'react';
import { makeCancelable } from '@toolkit/helperUtils';
import FetchAdapter from '@services/FetchAdapter';

type Action<T, U> =
    | { type: 'loading' }
    | { type: 'data'; payload: T }
    | { type: 'error'; payload: U };

interface State<T, U> {
    loading: boolean;
    data: T | null;
    error: U | null;
}
const createReducer = <T, U>(states: State<T, U>, action: Action<T, U>): State<T, U> => {
    switch (action.type) {
        case 'loading':
            return { ...states, loading: true };
        case 'data':
            return { ...states, loading: false, data: action.payload };
        case 'error':
            return { ...states, loading: false, error: action.payload };
        default:
            throw new Error();
    }
};

export default function useFetch<T, U = undefined>(operationId: string, args: any, dependencies: React.DependencyList | undefined): State<T, U> {
    const initialArg: State<T, U> = {
        loading: true,
        data: null,
        error: null,
    };
    const [state, dispatch] = React.useReducer(createReducer, initialArg);
    const apiCall = React.useRef<Cancelable<T> | null>();

    React.useEffect(() => {
        dispatch({ type: 'loading' });
        if (apiCall.current?.pending()) {
            apiCall.current.cancel();
        }
        apiCall.current = makeCancelable<T>(FetchAdapter.call(operationId, args));
        apiCall.current.promise
            .then(resp => dispatch({ type: 'data', payload: resp }))
            .catch(error => dispatch({ type: 'error', payload: error }));
        return () => {
            if (apiCall.current?.pending()) {
                apiCall.current.cancel();
            }
        };
        // eslint-disable-next-line
    }, dependencies);

    return {
        loading: state.loading,
        data: state.data as T,
        error: state.error as U,
    };
}
