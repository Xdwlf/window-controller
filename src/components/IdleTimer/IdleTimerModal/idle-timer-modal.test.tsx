import React from 'react';
import { render } from '@testing-library/react';
import { noop, minutesToMs } from '@toolkit/helperUtils';
import IdleTimerModal from './index';

describe('<IdleTimerModal />', () => {
    test('IdleTimeModal should show correct text for time count down', () => {
        let lastActive = new Date(Date.now() - minutesToMs(15));
        const { getByText, rerender } = render(
            <IdleTimerModal
                onCancel={noop}
                open
                getLastActiveTime={(): Date => lastActive}
                timeout={minutesToMs(20)}
            />
        );
        // one second before since mounting takes a second
        expect(getByText('4:59')).toBeInTheDocument();

        lastActive = new Date(Date.now() - minutesToMs(20));
        rerender(
            <IdleTimerModal
                onCancel={noop}
                open
                getLastActiveTime={(): Date => lastActive}
                timeout={minutesToMs(30)}
            />
        );
        expect(getByText('10:00')).toBeInTheDocument();

        lastActive = new Date(Date.now() - minutesToMs(20.9));
        rerender(
            <IdleTimerModal
                onCancel={noop}
                open
                getLastActiveTime={(): Date => lastActive}
                timeout={minutesToMs(30)}
            />
        );
        expect(getByText('9:06')).toBeInTheDocument();
    });
});
