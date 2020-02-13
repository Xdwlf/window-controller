import React, { ReactNode } from 'react';
import { render, fireEvent } from '@testing-library/react';
import ThemeProvider from '@context/ThemeContext';
import ErrorContent from './ErrorContent';

const Component = (props: any) => (
    <ThemeProvider>
        <ErrorContent {...props} />
    </ThemeProvider>
);

describe('<ErrorContent />', () => {
    test('renders all elements', () => {
        const { getByText } = render(<Component />);
        expect(getByText('Error')).toBeInTheDocument();
        expect(getByText('Oops! Looks like we lost our balance!')).toBeInTheDocument();
        expect(getByText('Please hang tight while we audit this page.')).toBeInTheDocument();
        expect(getByText('In the meantime, you can return to your dashboard to continue.')).toBeInTheDocument();
        expect(getByText('RETURN TO DASHBOARD')).toBeInTheDocument();
    });
    test('renders error if provided', () => {
        const { queryByText, rerender } = render(<Component />);
        expect(queryByText('You are too beautiful Error')).not.toBeInTheDocument();
        rerender(<Component error="You are too beautiful" />);
        expect(queryByText('You are too beautiful Error')).toBeInTheDocument();
    });
    test('handles click', () => {
        const mockFn = jest.fn();
        const { getByText } = render(<Component handleClick={mockFn} />);
        fireEvent.click(getByText('RETURN TO DASHBOARD'));
        expect(mockFn).toHaveBeenCalled();
    });
});
