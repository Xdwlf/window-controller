import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { noop } from '@toolkit/helperUtils';
import ThemeProvider from '@context/ThemeContext';
import ZoomSlider from '.';

const Component = (props: any) => (<ThemeProvider><ZoomSlider {...props} /></ThemeProvider>);

const defaultProps = {
    handleChange: noop,
};

describe('<ZoomSlider /> ', () => {
    test('renders buttons, slider, and percentage', () => {
        const { getByLabelText, getByText } = render(<Component {...defaultProps} />);
        expect(getByLabelText('Zoom In')).toBeInTheDocument();
        expect(getByLabelText('Zoom Out')).toBeInTheDocument();
        expect(getByLabelText('Zoom Slider')).toBeInTheDocument();
        expect(getByText('50%')).toBeInTheDocument();
    });
    test('changes value on change', async () => {
        const mockFn = jest.fn(val => val);
        const { getByLabelText, getByText } = render(<Component {...{ handleChange: mockFn }} />);
        fireEvent.click(getByLabelText('Zoom In'));
        expect(getByText('53%')).toBeInTheDocument();
        fireEvent.click(getByLabelText('Zoom Out'));
        fireEvent.click(getByLabelText('Zoom Out'));
        expect(getByText('46%')).toBeInTheDocument();
    });
});
