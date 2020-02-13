import React from 'react';
import { render, act } from '@testing-library/react';
import { queryByAriaBusy } from '@test/test-utils';
import FullScreenLoader, { showFullScreenLoader, hideFullScreenLoader } from '.';


describe('<FullScreenLoader /> ', () => {
    test('FullScreenLoader should not be loading on mount', () => {
        const { container } = render(<FullScreenLoader />);
        expect(queryByAriaBusy(container, 'false')).not.toBe(null);
        expect(queryByAriaBusy(container, 'true')).toBe(null);
    });
    test('FullScreenLoader should show loading indicator when showFullScreenLoader is called', () => {
        const { container } = render(<FullScreenLoader />);
        expect(queryByAriaBusy(container, 'true')).toBe(null);
        act(() => showFullScreenLoader());
        expect(queryByAriaBusy(container, 'true')).not.toBe(null);
    });
    test('FullScreenLoader should hide loading indicator when hideFullScreenLoader is called', () => {
        const { container } = render(<FullScreenLoader />);
        expect(queryByAriaBusy(container, 'true')).toBe(null);
        act(() => showFullScreenLoader());
        expect(queryByAriaBusy(container, 'true')).not.toBe(null);
        act(() => hideFullScreenLoader());
        expect(queryByAriaBusy(container, 'true')).toBe(null);
    });
    test('FullScreenLoader nothing should happen if show is called multiple times', () => {
        const { container } = render(<FullScreenLoader />);
        expect(queryByAriaBusy(container, 'true')).toBe(null);
        act(() => showFullScreenLoader());
        expect(queryByAriaBusy(container, 'true')).not.toBe(null);
        act(() => showFullScreenLoader());
        expect(queryByAriaBusy(container, 'true')).not.toBe(null);
    });
    test('FullScreenLoader nothing should happen if hide is called multiple times', () => {
        const { container } = render(<FullScreenLoader />);
        expect(queryByAriaBusy(container, 'true')).toBe(null);
        act(() => showFullScreenLoader());
        expect(queryByAriaBusy(container, 'true')).not.toBe(null);
        act(() => hideFullScreenLoader());
        expect(queryByAriaBusy(container, 'true')).toBe(null);
        act(() => hideFullScreenLoader());
        expect(queryByAriaBusy(container, 'true')).toBe(null);
    });
});
