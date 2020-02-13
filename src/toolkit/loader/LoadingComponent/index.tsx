import React from 'react';
import MUICircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import styles from './LoadingComponent.less';

interface LoadingComponentProps extends CircularProgressProps {
    containerClassname?: string;
}

const LoadingComponent = (props: LoadingComponentProps): JSX.Element => (
    <div className={styles.loadingIconContainer}>
        <MUICircularProgress {...props} />
    </div>
);

export default LoadingComponent;
