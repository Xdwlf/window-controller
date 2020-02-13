import React from 'react';
import { noop } from '@toolkit/helperUtils';

function useInterval(callback: () => any, delay: number | null): void {
    const savedCallback = React.useRef(callback);

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        function tick(): void {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return (): void => clearInterval(id);
        }
        return noop;
    }, [delay]);
}

export default useInterval;
