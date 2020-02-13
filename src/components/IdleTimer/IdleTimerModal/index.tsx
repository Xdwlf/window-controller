import React from 'react';
import Modal from '@components/Modal';
import { Button } from '@material-ui/core';
import { cssBind, diffTimes } from '@toolkit/helperUtils';
import Alarm from '@material-ui/icons/Alarm';
import useInterval from '@hooks/useInterval';
import styles from '../idle-timer.less';

const css = cssBind(styles);

type Props = {
    open: boolean;
    timeout: number;
    onCancel: () => void;
    getLastActiveTime: () => Date;
}

const IdleTimerModal = (props: Props): JSX.Element => {
    const [currentTime, setCurrentTime] = React.useState(Date.now());
    const tick = (): void => {
        setCurrentTime(Date.now());
    };
    useInterval(tick, props.open ? 1000 : null);

    const getTime = (): string => {
        const lastActive = props.getLastActiveTime();
        const timeElapsed = diffTimes(lastActive, currentTime);
        const remainder = new Date(props.timeout - timeElapsed);
        const minutes = remainder.getMinutes();
        const seconds = remainder.getSeconds().toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };
    return (
        <Modal
            quickClose={false}
            onClose={props.onCancel}
            open={props.open}
        >
            <Modal.Title>Session Expiring</Modal.Title>
            <Modal.Body className={css('body')}>
                <p className={css('description')}>
                    Due to inactivity, your session is expiring. You will be automatically logged out in:
                </p>
                <div className={css('time')}>
                    <Alarm color="error" />
                    {getTime()}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onCancel} variant="contained" color="primary">
                    CANCEL
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default IdleTimerModal;
