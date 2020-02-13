import React from 'react';
import { noop, minutesToMs } from '@toolkit/helperUtils';
import { debounce } from 'lodash';

type Options = {
    timeout?: number;
    warning?: number;
    startTimer?: boolean;
}

type UseIdleTimer = {
    cancelWarning: () => void;
    getLastActiveTime: () => Date;
    showWarning: boolean;
    timedOut: boolean;
}
const events = ['mousemove', 'keydown', 'mousedown'];
const twentyMinutesToMs = minutesToMs(20);
const fiveMinutesToMs = minutesToMs(5);

const UseIdleTimer = (options: Options): UseIdleTimer => {
    const defaultOptions = {
        timeout: twentyMinutesToMs,
        warning: twentyMinutesToMs - fiveMinutesToMs,
        startTimer: true,
        ...options,
    };
    const [showWarning, setWarning] = React.useState(false);
    const [timedOut, setTimedOut] = React.useState(false);
    const warningTimer = React.useRef<undefined | NodeJS.Timeout>();
    const timeoutTimer = React.useRef<undefined | NodeJS.Timeout>();
    const lastRecordRef = React.useRef<Date>(new Date());

    const getLastActiveTime = (): Date => lastRecordRef.current;

    const clearTimers = (): void => {
        if (timeoutTimer.current) {
            clearTimeout(timeoutTimer.current);
        }
        if (warningTimer.current) {
            clearTimeout(warningTimer.current);
        }
    };

    const invokeTimers = React.useCallback((): void => {
        clearTimers();
        warningTimer.current = setTimeout(() => {
            setWarning(true);
        }, defaultOptions.warning);

        timeoutTimer.current = setTimeout(() => {
            setTimedOut(true);
        }, defaultOptions.timeout);
    }, [defaultOptions.timeout, defaultOptions.warning]);

    const handleEvent = (): void => {
        if (showWarning) return;
        lastRecordRef.current = new Date();
        invokeTimers();
    };

    const handleEventRef = React.useRef<(() => void)>(handleEvent);
    const onWarningCancel = (): void => {
        if (showWarning) setWarning(false);
        invokeTimers();
    };
    React.useEffect(() => {
        handleEventRef.current = handleEvent;
    });

    React.useEffect(() => {
        if (defaultOptions.startTimer === false) {
            clearTimers();
            return noop;
        }
        invokeTimers();

        const onEvent = debounce(() => {
            if (handleEventRef.current) {
                handleEventRef.current();
            }
        }, 1000);

        events.forEach((event: string) => document.addEventListener(event, onEvent));

        return (): void => {
            events.forEach((event: string) => {
                document.removeEventListener(event, onEvent);
            });
        };
    }, [invokeTimers, defaultOptions.startTimer]);

    return {
        showWarning,
        timedOut,
        cancelWarning: onWarningCancel,
        getLastActiveTime,
    };
};

export default UseIdleTimer;
