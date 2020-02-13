import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useRefresh from './index';

describe('useRefresh hook', () => {
    test('returns a key', () => {
        const { result } = renderHook(() => useRefresh());
        const [key, toggleRefresh] = result.current
        const firstKey = key;
        expect(typeof firstKey).toBe('string')

    })
    test('changes the key when refresh is called', () => {
        const { result, rerender } = renderHook(() => useRefresh());
        const [firstKey, toggleRefresh] = result.current
        act(() => {
            toggleRefresh()
        })
        rerender()
        const [secondKey, secondToggleRefresh] = result.current
        expect(firstKey === secondKey).toBeFalsy()
    })
})