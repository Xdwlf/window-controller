import React, { ReactNode } from 'react';
import Modal from '@material-ui/core/Modal';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min';
import pdfjs from 'pdfjs-dist';
import { cssBind } from '@toolkit/helperUtils';
import styles from './PdfViewer.less';

export * from './PdfControls';
export * from './PdfContent';

const css = cssBind(styles);

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

type PdfViewerProps = {
    children: ReactNode;
    className?: string;
    open: boolean;
}

const PDFViewer = ({ open, children, className }: PdfViewerProps): JSX.Element => (
    <Modal open={open}>
        <div className={css('pdfModal', className)}>
            {children}
        </div>
    </Modal>

);

export default PDFViewer;
