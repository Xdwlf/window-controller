import React from 'react';
import { render } from '@testing-library/react';
import ThemeProvider from '@context/ThemeContext';
import PdfContent from '.';

jest.mock('pdfjs-dist/build/pdf.worker.min', () => ({
    call: jest.fn(),
}));

jest.mock('pdfjs-dist', () => ({
    call: jest.fn(),
    GlobalWorkerOptions: {}
}));

const defaultProps = {
    document: undefined,
    documentType: 'pdf',
};

const Component = (props: any): JSX.Element => (
    <ThemeProvider>
        <PdfContent {...props} />
    </ThemeProvider>
);

describe('<PdfContent />', () => {
    test('shows loader when document is not provided', () => {
        const { getByLabelText } = render(<Component {...defaultProps} />);
        expect(getByLabelText('Loading Pdf')).toBeInTheDocument();
    });
    test('shows unsupported document when type is not pdf', () => {
        const props = {
            document: 'IamnotperfectbutifIlookedperfecttoeveryoneImusthavebeenrockingimperfectperfectlytoafewimperfectsoulsthatseekimperfectionvsperfectioninanimperfectworldwhereGodasksustoseekperfectionforourimperfectsouls',
            documentType: 'doc',
        }; const { getByText } = render(<Component {...props} />);
        expect(getByText('DOWNLOAD')).toBeInTheDocument();
    });
});
