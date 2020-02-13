import React from 'react';
import { render, act } from '@testing-library/react';
import ThemeProvider from '@context/ThemeContext';
import SnackbarContainer, { SnackbarEvent } from '.';

const Snackbar = (): JSX.Element => (
    <ThemeProvider>
        <SnackbarContainer />
    </ThemeProvider>
);


describe('<Snackbar />', () => {
    jest.useFakeTimers()

    test('adds a snackbar item', () => {
        const { getByText } = render(<Snackbar />)
        act(() => {
            SnackbarEvent({
                type: 'error',
                message: 'Outside of a dog, a book is a man’s best friend. Inside of a dog it’s too dark to read.'
            });
        });
        expect(getByText(
            'Outside of a dog, a book is a man’s best friend. Inside of a dog it’s too dark to read.'
        )).toBeInTheDocument()
    })

    test('displays multiple snackbar items', () => {
        const { getByText } = render(<Snackbar />)
        act(() => {
            SnackbarEvent({ type: 'error', message: 'Is it friday yet' });
        });
        expect(getByText('Is it friday yet')).toBeInTheDocument()

        act(() => {
            SnackbarEvent({ type: 'success', message: 'Saw my reflection blink.' });
        });
        expect(getByText('Is it friday yet')).toBeInTheDocument()
        expect(getByText('Saw my reflection blink.')).toBeInTheDocument()

        act(() => {
            SnackbarEvent({ type: 'info', message: 'Education taught me nothing.' });
        });
        expect(getByText('Is it friday yet')).toBeInTheDocument()
        expect(getByText('Saw my reflection blink.')).toBeInTheDocument()
        expect(getByText('Education taught me nothing.')).toBeInTheDocument()

        act(() => {
            SnackbarEvent({ type: 'warning', message: 'I am groot.' });
        });
        expect(getByText('Is it friday yet')).toBeInTheDocument()
        expect(getByText('Saw my reflection blink.')).toBeInTheDocument()
        expect(getByText('Education taught me nothing.')).toBeInTheDocument()
        expect(getByText('I am groot.')).toBeInTheDocument()
    })

    test('removes multiple snackbar items', (done) => {
        const { getByText, queryAllByText } = render(<Snackbar />)
        act(() => {
            SnackbarEvent({ type: 'error', message: 'Is it friday yet' });
        });
        expect(getByText('Is it friday yet')).toBeInTheDocument()

        act(() => {
            SnackbarEvent({ type: 'success', message: 'Saw my reflection blink.' });
        });
        expect(getByText('Is it friday yet')).toBeInTheDocument()
        expect(getByText('Saw my reflection blink.')).toBeInTheDocument()
        act(() => {
            setTimeout(() => {
                expect(queryAllByText('Is it friday yet').length).toBe(0)
                expect(queryAllByText('Saw my reflection blink.').length).toBe(0)
                done()
            }, 5000)
            jest.runAllTimers()
        })
    })

});
