import React, { EffectCallback, DependencyList } from 'react';

function useDidUpdate(cb: EffectCallback, dependencies?: DependencyList): void {
    const didMount = React.useRef(false);

    React.useEffect(() => {
        if (didMount.current === true) {
            return cb();
        }
        return (): void => {};
    // eslint-disable-next-line
    }, dependencies);

    React.useEffect(() => {
        didMount.current = true;
    }, []);
}

export default useDidUpdate;
