import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

type DebounceProps<T> = [T, number]

function useDebounce<T>(...args: DebounceProps<T>): T {
    const [value, delay] = args;
    const [debouncedValue, setDebouncedValue] = useState(value);
    const debounceCallback = useCallback(debounce((val: T) => { setDebouncedValue(val); }, delay), []);
    useEffect(() => {
        debounceCallback(value);
    }, [value, delay, debounceCallback]);

    return debouncedValue;
}

export { useDebounce };
