import React from 'react';
import { render } from '@testing-library/react';
import PdfViewer from '.';

jest.mock('pdfjs-dist/build/pdf.worker.min', () => ({
    call: jest.fn(),
}));

jest.mock('pdfjs-dist', () => ({
    call: jest.fn(),
    GlobalWorkerOptions: {}
}));

const Component = (props: any): JSX.Element => (
    <PdfViewer {...props} />
);

describe('<PdfViewer />', () => {
    test('only shows content when open', () => {
        const { queryByText, rerender } = render(<Component open={false}>KASSOGTHA</Component>);
        expect(queryByText('KASSOGTHA')).not.toBeInTheDocument();
        rerender(<Component open>KASSOGTHA</Component>);
        expect(queryByText('KASSOGTHA')).toBeInTheDocument();
    });
});
