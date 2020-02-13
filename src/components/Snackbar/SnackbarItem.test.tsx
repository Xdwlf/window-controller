import React from 'react';
import { render } from '@testing-library/react';
import ThemeProvider from '@context/ThemeContext';
import { act } from 'react-dom/test-utils';
import SnackbarItem, { SnackbarItemProps } from './SnackbarItem';
import { SnackbarType } from '.';

const defaultProps: SnackbarItemProps = {
    snackbar: {
        message: 'Message',
        type: 'error',
        id: 'id',
    },
    removeSnackbar: () => { },
};

const snackbars: SnackbarType[] = [{
    message: 'Your request could not be completed.',
    type: 'error',
    id: 'errorid',
}, {
    message: 'Successfully changed.',
    type: 'success',
    id: 'successid',
}, {
    message: 'You will lose your changes.',
    type: 'warning',
    id: 'warningid',
}, {
    message: 'This cannot be undone.',
    type: 'info',
    id: 'infoid',
}];

const Item = (props: SnackbarItemProps) => (
    <ThemeProvider>
        <SnackbarItem {...props} />
    </ThemeProvider>
);


describe('<SnackbarItem/>', () => {
    jest.useFakeTimers();

    snackbars.forEach((snackbar) => {
        test(`renders a svg and a message and a close button for ${snackbar.type} type`, () => {
            const snackbarProps: SnackbarItemProps = { ...defaultProps, snackbar };
            const { getByText, getByLabelText } = render(<Item {...snackbarProps} />);
            expect(getByLabelText('close')).toBeInTheDocument();
            if (typeof snackbar.message === 'string') {
                expect(getByText(snackbar.message)).toBeInTheDocument();
            }
        });
    });
    test('fades in immediately', () => {
        const { getByText } = render(<Item {...defaultProps} />);
        expect(getByText('Message')).toBeVisible();
    });
    test('disappears after autoHideDuration', () => {
        const { getByText } = render(<Item {...defaultProps} autoHideDuration={50} />);
        const SnackItem = getByText('Message');
        expect(SnackItem).toBeVisible();
        act(() => {
            setTimeout(() => {
                expect(SnackItem).not.toBeVisible();
            }, 100);
            jest.runAllTimers();
        });
    });
    test('calls removeSnackbar function after it is not visible', () => {
        const mockCallback = jest.fn(id => id);
        const { getByText } = render(
            <Item {...defaultProps} autoHideDuration={50} removeSnackbar={mockCallback} />
        );
        expect(getByText('Message')).toBeInTheDocument();
        expect(mockCallback).toBeCalledTimes(0);
        act(() => {
            setTimeout(() => {
                expect(mockCallback).toBeCalledTimes(1);
            }, 2000);
            jest.runAllTimers();
        });
    });
});
