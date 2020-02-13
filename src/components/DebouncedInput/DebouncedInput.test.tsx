import React, { ReactNode } from 'react';
import { act } from 'react-dom/test-utils';
import {
    render, fireEvent,
} from '@testing-library/react';
import ThemeProvider from '@context/ThemeContext';
import DebouncedInput from './index';

type InputProps = {
    children: ReactNode;
    handleChange: Function;
    placeholder?: string;
    delay?: number;
}

const Input = ({
    children, handleChange, placeholder, delay,
}: InputProps): JSX.Element => (
        <ThemeProvider>
            <DebouncedInput
                handleChange={handleChange}
                placeholder={placeholder}
                delay={delay}
            >
                {children}
            </DebouncedInput>
        </ThemeProvider>
    );

const logChange = (input: string): string => input;

describe('Debounced Input', () => {
    const text = 'I am Child';
    const placeholderText = 'Placeholder';
    const delay = 500;

    jest.useFakeTimers();

    test('should render children', () => {
        const { getByText } = render(<Input handleChange={logChange}>{text}</Input>);
        expect(getByText(text)).toBeInTheDocument();
    });

    test('should debounce calling handleChange', () => {
        const mockFn = jest.fn();
        const { getByPlaceholderText } = render(<Input placeholder={placeholderText} delay={delay} handleChange={mockFn}>{text}</Input>);
        const input = getByPlaceholderText(placeholderText);
        act(() => input.focus());
        fireEvent.change(input, { target: { value: 'a' } });
        fireEvent.change(input, { target: { value: 'ab' } });
        fireEvent.change(input, { target: { value: 'abc' } });
        setTimeout(() => {
            expect(mockFn.mock.calls.length).toBe(1);
        }, delay);
    });

    test('should render input value text at normal speed', () => {
        const mockFn = jest.fn();
        const { getByPlaceholderText } = render(<Input placeholder={placeholderText} handleChange={mockFn}>{text}</Input>);
        const input = getByPlaceholderText(placeholderText) as HTMLInputElement;
        act(() => input.focus());
        fireEvent.change(input, { target: { value: 'a' } });
        expect(input.value).toBe('a');
        fireEvent.change(input, { target: { value: 'ab' } });
        expect(input.value).toBe('ab');
        fireEvent.change(input, { target: { value: 'abc' } });
        expect(input.value).toBe('abc');
    });
});
