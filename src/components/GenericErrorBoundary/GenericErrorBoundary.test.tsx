/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable no-console */
import React from 'react';
import { render } from '@testing-library/react';
import ThemeProvider from '@context/ThemeContext';
import GenericErrorBoundary from '.';

const Component = ({ children }: any) => (
    <ThemeProvider>
        <GenericErrorBoundary>
            {children}
        </GenericErrorBoundary>
    </ThemeProvider>
);

const ChildWithError = () => {
    React.useEffect(() => {
        throw new Error('Error!!');
    }, [])
    return <div>Child</div>
};

describe('<GenericErrorBoundary />', () => {
    let ConsoleError: jest.Mocked<any>;
    let ConsoleWarn: jest.Mocked<any>;
    beforeEach(() => {
        jest.spyOn(console, 'error')
        jest.spyOn(console, 'warn')
        ConsoleError = console.error as any
        ConsoleWarn = console.warn as any
        ConsoleError.mockImplementation(() => { })
        ConsoleWarn.mockImplementation(() => { })
    })
    afterEach(() => {
        ConsoleError = console.error as any
        ConsoleWarn = console.warn as any
        ConsoleError.mockRestore()
        ConsoleWarn.mockRestore()
    })
    test('renders the components when there is no error', () => {
        const child = <div>Frodo Baggins</div>;
        const { getByText } = render(<Component>{child}</Component>);
        expect(getByText('Frodo Baggins')).toBeInTheDocument();
    });
    test('renders the error page when an error has been thrown', () => {
        const { queryByText, getByText } = render(<Component><ChildWithError /></Component>);
        expect(queryByText('Child')).not.toBeInTheDocument();
        expect(getByText('RETURN TO DASHBOARD')).toBeInTheDocument()
        expect(ConsoleWarn).toBeCalled()
    });
});
