import React from 'react';
import {
    render, fireEvent, act,
} from '@testing-library/react';
import PaginationControl from '.';

const defaultProps = {
    onPageChange: () => { },
    pageNum: 1,
    totalPageNum: 5,
};

const Component = (props: any): JSX.Element => (<PaginationControl {...props} />);

describe('<PaginationControl />', () => {
    test('renders the correct page number', () => {
        const { getByText } = render(<Component {...defaultProps} />);
        expect(getByText('Page: 1')).toBeInTheDocument();
    });
    describe('renders the right number controls', () => {
        test(' when total pages are 1', () => {
            const props = {
                ...defaultProps,
                totalPageNum: 1,
            };
            const { getByText, queryByText } = render(<Component {...props} />);
            expect(getByText('1')).toBeInTheDocument();
            expect(queryByText('2')).not.toBeInTheDocument();
        });
        test('when total pages are 3', () => {
            const props = {
                ...defaultProps,
                totalPageNum: 3,
            };
            const { getByText, queryByText } = render(<Component {...props} />);
            expect(getByText('1')).toBeInTheDocument();
            expect(getByText('2')).toBeInTheDocument();
            expect(getByText('3')).toBeInTheDocument();
            expect(queryByText('4')).not.toBeInTheDocument();
        });
        test('with last page button when more than 4 total pages', () => {
            const props = {
                ...defaultProps,
                totalPageNum: 4,
            };
            const { getByText, queryByLabelText } = render(<Component {...props} />);
            expect(getByText('1')).toBeInTheDocument();
            expect(getByText('2')).toBeInTheDocument();
            expect(getByText('3')).toBeInTheDocument();
            expect(getByText('4')).toBeInTheDocument();
            expect(queryByLabelText('More Pages')).not.toBeInTheDocument();
        });
        test('with more icon when more than 5 total pages', () => {
            const { getByText, getByLabelText } = render(<Component {...defaultProps} />);
            expect(getByText('1')).toBeInTheDocument();
            expect(getByText('2')).toBeInTheDocument();
            expect(getByText('3')).toBeInTheDocument();
            expect(getByText('5')).toBeInTheDocument();
            expect(getByLabelText('More Pages')).toBeInTheDocument();
        });
    });

    describe('renders the correct arrow buttons', () => {
        test('left arrow is disabled when current page is 1', () => {
            const { getByLabelText } = render(<Component {...defaultProps} />);
            const leftArrow = getByLabelText('Previous Page');
            expect(leftArrow).toBeInTheDocument();
            expect(leftArrow.closest('button')).toHaveAttribute('disabled');
        });
        test('left arrow is not disabled when current page is not 1', () => {
            const props = {
                ...defaultProps,
                pageNum: 2,
            };
            const { getByLabelText } = render(<Component {...props} />);
            const leftArrow = getByLabelText('Previous Page');
            expect(leftArrow).toBeInTheDocument();
            expect(leftArrow.closest('button')).not.toHaveAttribute('disabled');
        });
        test('right arrow is disabled when current page is last page', () => {
            const props = {
                ...defaultProps,
                pageNum: 5,
            };
            const { getByLabelText } = render(<Component {...props} />);
            const rightArrow = getByLabelText('Next Page');
            expect(rightArrow).toBeInTheDocument();
            expect(rightArrow.closest('button')).toHaveAttribute('disabled');
        });
        test('right arrow is active when current page is not last page', () => {
            const props = {
                ...defaultProps,
                pageNum: 3,
            };
            const { getByLabelText } = render(<Component {...props} />);
            const rightArrow = getByLabelText('Next Page');
            expect(rightArrow).toBeInTheDocument();
            expect(rightArrow.closest('button')).not.toHaveAttribute('disabled');
        });
    });

    describe('more dropdown', () => {
        test('renders when there are more than 4 elements', () => {
            const { getByLabelText } = render(<Component {...defaultProps} />);
            const moreButton = getByLabelText('More Pages');
            expect(moreButton).toBeInTheDocument();
        });
        test('does not render when there are 4 or less elements', () => {
            const props = {
                ...defaultProps,
                totalPageNum: 4,
            };
            const { queryByLabelText } = render(<Component {...props} />);
            const moreButton = queryByLabelText('More Pages');
            expect(moreButton).not.toBeInTheDocument();
        });
    });

    test('calls onPageChange with correct page number on change', () => {
        const mockFn = jest.fn();
        const props = {
            ...defaultProps,
            onPageChange: mockFn,
        };
        const { getByText } = render(<Component {...props} />);
        fireEvent.click(getByText('2'));
        expect(mockFn).toBeCalledWith(2);
        fireEvent.click(getByText('5'));
        expect(mockFn).toBeCalledWith(5);
    });

    describe('go to page input', () => {
        test('renders', () => {
            const { getByText, getByTestId } = render(<Component {...defaultProps} />);
            expect(getByText('GO TO PAGE:')).toBeInTheDocument();
            expect(getByTestId('page-input')).toBeInTheDocument();
        });
        test('changes on number change', () => {
            const mockFn = jest.fn();
            const props = {
                ...defaultProps,
                onPageChange: mockFn,
            };
            const { getByTestId } = render(<Component {...props} />);
            const input = getByTestId('page-input');
            act(() => input.focus());
            fireEvent.change(input, { target: { value: 3 } });
            expect(input).toHaveValue('3');
            fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
            expect(mockFn).toHaveBeenCalledWith(3);
        });
        test('ignores special characters', () => {
            const { getByTestId } = render(<Component {...defaultProps} />);
            const input = getByTestId('page-input');
            act(() => input.focus());
            fireEvent.change(input, { target: { value: '-' } });
            expect(input).toHaveValue('1');
            fireEvent.change(input, { target: { value: '@!%^' } });
            expect(input).toHaveValue('1');
        });
        test('ignores nonnumber values', () => {
            const { getByTestId } = render(<Component {...defaultProps} />);
            const input = getByTestId('page-input');
            act(() => input.focus());
            fireEvent.change(input, { target: { value: 'Here, likelihood you feel I said to pile gibberish, be!' } });
            expect(input).toHaveValue('1');
        });
        test('does not run function on values outside of valid range', () => {
            const mockFn = jest.fn();
            const props = {
                ...defaultProps,
                onPageChange: mockFn,
            };
            const { getByTestId } = render(<Component {...props} />);
            const input = getByTestId('page-input');
            act(() => input.focus());
            fireEvent.change(input, { target: { value: 6 } });
            expect(input).toHaveValue('6');
            fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
            expect(mockFn).not.toHaveBeenCalled();
            fireEvent.change(input, { target: { value: -1 } });
            expect(input).toHaveValue('-1');
            fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
            expect(mockFn).not.toHaveBeenCalled();
            fireEvent.change(input, { target: { value: 3 } });
            expect(input).toHaveValue('3');
            fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
            expect(mockFn).toHaveBeenCalledWith(3);
        });
    });
});
