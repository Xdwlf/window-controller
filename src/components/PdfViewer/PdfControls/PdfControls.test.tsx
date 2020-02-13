import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ThemeProvider from '@context/ThemeContext';
import ZoomSlider from './ZoomSlider';
import PdfControls from '.';

jest.mock('./ZoomSlider', () => jest.fn());

const Zoom: jest.Mocked<any> = ZoomSlider as any;
Zoom.mockImplementation((props: any) => (
    <div>Zoom</div>
));

const Component = (props: any) => (<ThemeProvider><PdfControls {...props} /></ThemeProvider>);

const defaultProps = {
    title: 'Shub-Niggurath',
    subText: 'The Black Goat of the Woods with a Thousand Young',
    totalPageNum: 5,
    currentPage: 1,
    uploadedBy: 'Howard Phillips Lovecraft',
    onScaleChange: () => { },
};

describe('<PdfControls/>', () => {
    test('renders the correct title and subtext', () => {
        const { getByText } = render(<Component {...defaultProps} />);
        expect(getByText('Shub-Niggurath')).toBeInTheDocument();
        expect(getByText('The Black Goat of the Woods with a Thousand Young')).toBeInTheDocument();
    });
    test('renders the correct uploaded by when provided', () => {
        const { getByText } = render(<Component {...defaultProps} />);
        expect(getByText('UPLOADED BY:')).toBeInTheDocument();
        expect(getByText('Howard Phillips Lovecraft')).toBeInTheDocument();
    });
    test('renders the correct current page and total page', () => {
        const { getByText } = render(<Component {...defaultProps} />);
        expect(getByText('Page: 1')).toBeInTheDocument();
        expect(getByText('5')).toBeInTheDocument();
    });
    test('calls the changepage function on page change', () => {
        const mockFn = jest.fn(val => val);
        const props = {
            ...defaultProps,
            onPageChange: mockFn,
        };
        const { getByText } = render(<Component {...props} />);
        fireEvent.click(getByText('3'));
        expect(mockFn).toBeCalled();
    });
    test('renders the close button', () => {
        const { getByLabelText } = render(<Component {...defaultProps} />);
        expect(getByLabelText('Close Pdf Viewer')).toBeInTheDocument();
    });
    test('calls the onClose function on close', () => {
        const mockFn = jest.fn(val => val);
        const props = {
            ...defaultProps,
            onClose: mockFn,
        };
        const { getByLabelText } = render(<Component {...props} />);
        fireEvent.click(getByLabelText('Close Pdf Viewer'));
        expect(mockFn).toBeCalled();
    });
    test('calls the onClose when only when escape key is pressed', () => {
        const mockFn = jest.fn(val => val);
        const props = {
            ...defaultProps,
            onClose: mockFn,
        };
        const { container } = render(<Component {...props} />);
        fireEvent.keyDown(container, { key: 'Enter', keyCode: 13 });
        expect(mockFn).not.toBeCalled();
        fireEvent.keyDown(container, { key: 'Escape', keyCode: 27 });
        expect(mockFn).toBeCalled();
    });
});
