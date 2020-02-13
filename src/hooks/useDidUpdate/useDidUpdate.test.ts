import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useDidUpdate from './index';

describe('useDidUpdate', () => {
    test('useDidUpdate not call the cb on mount', () => {
        const cb = jest.fn();
        renderHook(() => useDidUpdate(cb));
        expect(cb).toHaveBeenCalledTimes(0);
    });
    test('useDidUpdate should call cb on subsequent calls', () => {
        const cb = jest.fn();
        const { rerender } = renderHook(() => useDidUpdate(cb));
        expect(cb).toHaveBeenCalledTimes(0);
        rerender();
        expect(cb).toHaveBeenCalledTimes(1);
    });
    test('useDidUpdate should call cb on subsequent calls with dep changes', () => {
        const cb = jest.fn();
        const { rerender } = renderHook(() => useDidUpdate(cb));
        expect(cb).toHaveBeenCalledTimes(0);
        rerender();
        expect(cb).toHaveBeenCalledTimes(1);
        rerender();
        expect(cb).toHaveBeenCalledTimes(2);
    });
    test('useDidUpdate should call cb on subsequent calls with dep added', () => {
        const cb = jest.fn();
        const { rerender } = renderHook(() => useDidUpdate(cb, [1]));
        expect(cb).toHaveBeenCalledTimes(0);
        rerender();
        expect(cb).toHaveBeenCalledTimes(0);
    });
    test('useDidUpdate should call clean up', () => {
        const cleanup = jest.fn();
        const cb = jest.fn().mockReturnValue(cleanup);
        const { rerender } = renderHook(() => useDidUpdate(cb));
        expect(cb).toHaveBeenCalledTimes(0);
        rerender();
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cleanup).toHaveBeenCalledTimes(0);
        rerender();
        expect(cleanup).toHaveBeenCalledTimes(1);
    });
});
