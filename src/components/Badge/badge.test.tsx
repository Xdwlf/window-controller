import React, { ReactNode } from 'react';
import ThemeProvider from '@context/ThemeContext';
import { render } from '@testing-library/react';
import Badge, { rgbToRgba, hexTpRgba, rgbaToRgba } from './index';

const Component = (props: any): JSX.Element => (
    <ThemeProvider>
        <Badge {...props} />
    </ThemeProvider>
);

describe('<Badge />', () => {
    test('Badge should render without crashing and have correct background color', () => {
        const { getByText } = render(
            <Component color="error" tag="div">Hello</Component>
        );
        expect(getByText('Hello')).toBeInTheDocument();
        expect(getByText('Hello')).toHaveStyle('background-color: rgba(217, 83, 79, 0.1);');
    });
    test('Badge should rbe able to render same props as typography', () => {
        const { getByText } = render(
            <Component bold color="error" tag="div">Hello</Component>
        );
        expect(getByText('Hello')).toBeInTheDocument();
        expect(getByText('Hello')).toHaveStyle('font-weight: bold;');
    });
    test('rgbaToRgba should return correct rgba value', () => {
        let color = rgbaToRgba('rgba(217, 83, 79, 0.5)');
        expect(color).toBe('rgba(217,83,79,0.1)');
        color = rgbaToRgba('rgba(0, 83,0, 1)');
        expect(color).toBe('rgba(0,83,0,0.1)');
    });
    test('rgbToRgba should return correct rgba value', () => {
        let color = rgbToRgba('rgb(0, 0, 0)');
        expect(color).toBe('rgba(0,0,0,0.1)');
        color = rgbToRgba('rgba(217, 0, 1)');
        expect(color).toBe('rgba(217,0,1,0.1)');
    });
    test('hexTpRgba should return correct rgba value', () => {
        let color = hexTpRgba('#eee');
        expect(color).toBe('rgba(238,238,238,0.1)');
        color = hexTpRgba('#000000');
        expect(color).toBe('rgba(0,0,0,0.1)');
        color = hexTpRgba('#FFFFFF');
        expect(color).toBe('rgba(255,255,255,0.1)');
    });
});
