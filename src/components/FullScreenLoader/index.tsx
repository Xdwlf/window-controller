import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import spIcon from '@assets/favicon/sureprep-apple-icon-152x152.png';
import { cssBind } from '@toolkit/helperUtils';
import EventEmitter from '@services/EventEmitter';
import styles from './FullScreenLoader.less';

const FullScreenLoaderEmitter = new EventEmitter();

const css = cssBind(styles);

const SHOW_LOADING = 'showLoading';
const HIDE_LOADING = 'hideLoading';

export const showFullScreenLoader = (): void => {
    FullScreenLoaderEmitter.emit(SHOW_LOADING);
};
export const hideFullScreenLoader = (): void => {
    FullScreenLoaderEmitter.emit(HIDE_LOADING);
};

const FullScreenLoader = (): JSX.Element => {
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const hideFSLoader = (): void => {
        if (isLoading === false) return;
        setLoading(false);
    };
    const showFSLoader = (): void => {
        if (isLoading === true) return;
        setLoading(true);
    };

    const hideFSLoaderRef = React.useRef(hideFSLoader);
    const showFSLoaderRef = React.useRef(showFSLoader);

    React.useEffect(() => {
        hideFSLoaderRef.current = hideFSLoader;
        showFSLoaderRef.current = showFSLoader;
    });

    React.useEffect(() => {
        const hidePointer = (): void => hideFSLoaderRef.current();
        const showPointer = (): void => showFSLoaderRef.current();
        FullScreenLoaderEmitter.subscribe(HIDE_LOADING, hidePointer);
        FullScreenLoaderEmitter.subscribe(SHOW_LOADING, showPointer);
        return (): void => {
            FullScreenLoaderEmitter.unSubscribe(SHOW_LOADING, showPointer);
            FullScreenLoaderEmitter.unSubscribe(HIDE_LOADING, hidePointer);
        };
    }, []);

    return (
        <div
            className={css('fullScreenContainer', isLoading ? 'loading' : 'loaded')}
            aria-busy={isLoading ? 'true' : 'false'}
        >
            <div className={css('fullScreenLoader')}>
                <div className={styles.logo}>
                    <img className={styles.img} src={spIcon} alt="Sureprep Logo" />
                </div>
                <LinearProgress color="secondary" />
            </div>
        </div>
    );
};

export default FullScreenLoader;
