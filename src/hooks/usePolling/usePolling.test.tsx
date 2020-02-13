import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import FetchAdapter from '@services/FetchAdapter';
import usePolling from './index';

const Fetch: jest.Mocked<any> = FetchAdapter as any;

describe('UsePoll', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
        jest.clearAllTimers();
        Fetch.call.mockClear();
    });
    test('usePolling should call the poll function isPolling option is true', async () => {
        Fetch.call.mockImplementationOnce(() => Promise.resolve({ bool: true }));

        const options = {
            interval: 1000,
            isPolling: false,
        };
        const { waitForNextUpdate, rerender } = renderHook((props: any) => usePolling(props, 'some_api_value'),
            { initialProps: options });

        expect(Fetch.call).toHaveBeenCalledTimes(0);

        rerender({ interval: 1000, isPolling: true });
        jest.runOnlyPendingTimers();
        await waitForNextUpdate();
        rerender(options);
        expect(Fetch.call).toHaveBeenCalledTimes(1);
    });
    test('usePolling should start polling immediately when isPolling option is true', async () => {
        Fetch.call.mockImplementationOnce(() => Promise.resolve({ bool: true }));

        const options = {
            interval: 1000,
            isPolling: true,
        };
        const { waitForNextUpdate, rerender } = renderHook((props: any) => usePolling(props, 'some_api_value'),
            { initialProps: options });
        jest.runOnlyPendingTimers();
        await waitForNextUpdate();
        expect(Fetch.call).toHaveBeenCalledTimes(1);
        rerender({ interval: 1000, isPolling: false });
    });
    test('usePolling should call the poll function then stop when isPolling option is false', async () => {
        const resp = { bool: true };
        Fetch.call.mockImplementationOnce(() => Promise.resolve(resp));

        const options = {
            interval: 1000,
            isPolling: false,
        };
        const { waitForNextUpdate, rerender } = renderHook((props: any) => usePolling(props, 'some_api_value'),
            { initialProps: options });

        expect(Fetch.call).toHaveBeenCalledTimes(0);
        rerender({ interval: 1000, isPolling: true });
        jest.runOnlyPendingTimers();
        await waitForNextUpdate();
        expect(Fetch.call).toHaveBeenCalledTimes(1);
        jest.runOnlyPendingTimers();
        await waitForNextUpdate();
        expect(Fetch.call).toHaveBeenCalledTimes(2);
        jest.runOnlyPendingTimers();
        await waitForNextUpdate();
        expect(Fetch.call).toHaveBeenCalledTimes(3);
        rerender({ interval: 1000, isPolling: false });
        expect(Fetch.call).toHaveBeenCalledTimes(3);
    });
    test('usePolling should return correct data returned from api', async () => {
        const resp = { bool: true };
        Fetch.call.mockImplementationOnce(() => Promise.resolve(resp));

        const options = {
            interval: 1000,
            isPolling: true,
        };
        const { result, waitForNextUpdate, rerender } = renderHook((props: any) => usePolling(props, 'some_api_value'),
            { initialProps: options });
        jest.runOnlyPendingTimers();
        await waitForNextUpdate();
        expect(result.current.data).toEqual(resp);
        rerender({ interval: 1000, isPolling: false });
    });
});
