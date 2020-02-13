import React, { ReactNode } from 'react';
import { render, fireEvent } from '@testing-library/react';
import ThemeProvider from '@context/ThemeContext';
import { noop } from '@toolkit/helperUtils';
import YesNoModal from '.';


const defaultProps = {
    open: true,
    title: 'The Stalwart Guardian of the Scroll of the South',
    children: 'No revolution is worth anything unless it can defend itself!',
    onClose: noop,
    onNo: noop,
    onYes: noop,
    disablePortal: true,
};

const Component = (props: any): JSX.Element => {
    const newProps = { ...defaultProps, ...props };
    return (
        <ThemeProvider>
            <YesNoModal {...newProps} />
        </ThemeProvider>
    );
};


describe('<YesNoModal />', () => {
    test('renders title and body', () => {
        const { getByText } = render(<Component />);
        expect(getByText('The Stalwart Guardian of the Scroll of the South')).toBeInTheDocument();
        expect(getByText('No revolution is worth anything unless it can defend itself!')).toBeInTheDocument();
    });
    test('renders buttons with custom text if specified and default if not specified', () => {
        const noCaption = 'The Royal Ruler of the Ten Houses of Mystery';
        const yesCaption = 'The Master of the Only Spire of Wrath';
        const { getByText, rerender } = render(<Component />);
        expect(getByText('CONFIRM')).toBeInTheDocument();
        expect(getByText('CANCEL')).toBeInTheDocument();
        rerender(<Component noCaption={noCaption} yesCaption={yesCaption} />);
        expect(getByText(noCaption)).toBeInTheDocument();
        expect(getByText(yesCaption)).toBeInTheDocument();
    });
    test('activates onClose when closed, onNo when no is clicked, and onYes when yes is clicked', () => {
        const onClose = jest.fn();
        const onNo = jest.fn();
        const onYes = jest.fn();
        const { getByText, getByLabelText } = render(<Component onClose={onClose} onYes={onYes} onNo={onNo} />);
        fireEvent.click(getByText('CONFIRM'));
        expect(onYes).toHaveBeenCalled();
        fireEvent.click(getByText('CANCEL'));
        expect(onNo).toHaveBeenCalled();
        fireEvent.click(getByLabelText('Close'));
        expect(onClose).toHaveBeenCalled();
    });
});
