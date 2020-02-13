import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ThemeProvider from '@context/ThemeContext';
import DocumentRow from './index';

const Component = (props: any): JSX.Element => (
    <ThemeProvider>
        <DocumentRow>
            {props.children}
        </DocumentRow>
    </ThemeProvider>
);
describe('<DocumentRow>', () => {
    test('DocumentRow should render a menu when we pass in menu content', () => {
        const { getByLabelText, getByText, getByRole } = render(
            <Component id="test-id">
                <div>main content</div>
                <div>menu content</div>
            </Component>
        );
        expect(getByLabelText('open document menu')).toBeInTheDocument();
        expect(getByText('main content')).toBeInTheDocument();
        expect(getByText('menu content')).toBeInTheDocument();
        expect(getByRole('menu')).toBeInTheDocument();
    });
    test('DocumentRow should render no menu or menu button when not passed in second node', () => {
        const { queryByLabelText, getByText, queryByRole } = render(
            <Component id="test-id">
                <div>main content</div>
            </Component>
        );
        expect(queryByLabelText('open document menu')).toBe(null);
        expect(getByText('main content')).toBeInTheDocument();
        expect(queryByRole('menu')).toBe(null);
    });
    test('When the menu is open the content should be visible', () => {
        const { getByLabelText, getByText, getByRole } = render(
            <Component id="test-id">
                <div>main content</div>
                <div>menu content</div>
            </Component>
        );
        expect(getByLabelText('open document menu')).toBeInTheDocument();
        expect(getByText('menu content')).toBeInTheDocument();
        expect(getByText('main content')).toBeInTheDocument();
        expect(getByRole('menu')).toBeInTheDocument();
        fireEvent.click(getByLabelText('open document menu'), { target: {} });
        expect(getByLabelText('close document menu')).toBeInTheDocument();
    });
    test('When the menu is open the close button should be visible', () => {
        const { getByLabelText, getByText, getByRole } = render(
            <Component id="test-id">
                <div>main content</div>
                <div>menu content</div>
            </Component>
        );
        expect(getByRole('menu')).not.toHaveClass('open');
        fireEvent.click(getByLabelText('open document menu'), { target: {} });
        expect(getByRole('menu')).toHaveClass('open');
    });
});
