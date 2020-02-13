import React from 'react';
import {
    render,
} from '@testing-library/react';
import Skeleton, { SkeletonList } from './index';

describe('<Skeleton />', () => {
    test('SkeletonList should render a list of the child element passed in', () => {
        const { getAllByTestId } = render(
            <SkeletonList count={5}>
                <div data-testid="skeleton" />
            </SkeletonList>
        );
        expect(getAllByTestId('skeleton')).toHaveLength(5);
    });
    test('SkeletonList should render a list of the child element passed in', () => {
        const { getAllByText } = render(
            <SkeletonList count={10}>
                <div data-testid="skeleton"><span>skeleton</span></div>
            </SkeletonList>
        );
        expect(getAllByText('skeleton')).toHaveLength(10);
    });
    test('SkeletonList should render a list of the Skeleton elements', () => {
        const { getAllByTestId } = render(
            <SkeletonList count={3}>
                <Skeleton data-testid="skeleton" />
            </SkeletonList>
        );
        expect(getAllByTestId('skeleton')).toHaveLength(3);
    });
});
