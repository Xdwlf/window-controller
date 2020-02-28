import React from 'react';
import Typography from '@components/Typography';
import useConsumeMessage from 'src/hooks/useConsumeMessage';
import styles from './ChildWindow.less';

const ChildWindow = () => {
    const latestData = useConsumeMessage<string>('livetext');

    return (
        <div className={styles.childWindow}>
            <Typography tag="h3" color="primary" bold>
                Popup Child
            </Typography>
            <div className={styles.liveData}>
                <Typography
                    tag="div"
                    color="secondary"
                >
                    Live Data:
                </Typography>
                <div>
                    {latestData}
                </div>
            </div>
        </div>
    );
};

export default ChildWindow;
