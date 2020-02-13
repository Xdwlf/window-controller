import React from 'react';
import { debounce } from 'lodash';

type SavedCallback = {
    (): void;
}
type Options = {
    onResize(): void;
    delay?: number;
}
function useWindowResize(options: Options): void {
    const calculateWindowWidth = debounce(() => {
        window.requestAnimationFrame(() => {
            setTimeout(() => {
                options.onResize();
            }, 0);
        });
    }, (options.delay || 200));

    const savedCallback = React.useRef<SavedCallback>(calculateWindowWidth);


    React.useEffect(() => {
        savedCallback.current = calculateWindowWidth;
    });

    React.useEffect(() => {
        function resize(): void {
            savedCallback.current();
        }
        window.addEventListener('resize', resize);
        return (): void => {
            window.removeEventListener('resize', resize);
        };
    }, []);
}
export default useWindowResize;
