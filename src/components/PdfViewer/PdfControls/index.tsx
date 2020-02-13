import React from 'react';
import { noop, cssBind } from '@toolkit/helperUtils';
import Typography from '@components/Typography';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import PaginationControl from './PaginationControl';
import ZoomSlider from './ZoomSlider';
import styles from './PdfControls.less';

const css = cssBind(styles);

type ControlProps = {
    title?: string;
    subText?: string;
    totalPageNum?: number;
    currentPage?: number;
    uploadedBy?: string;
    onPageChange?: (n: number) => void;
    onScaleChange?: (n: number) => void;
    onRotateChange?: () => void;
    onClose?: () => void;
    reset?: boolean;
}

export const PdfControls = ({
    title = '',
    reset = false,
    subText = '',
    totalPageNum = 1,
    currentPage = 1,
    onPageChange = noop,
    onScaleChange = noop,
    onRotateChange = noop,
    onClose = noop,
    uploadedBy,
}: ControlProps): JSX.Element => {
    const pageChange = (pageNum: number): void => {
        onPageChange(pageNum);
    };

    React.useEffect(() => {
        const handleEscKey = (event: KeyboardEvent): void => {
            if (event.keyCode === 27) { // If the escape key is pressed, close the pdf viewer
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscKey);
        return (): void => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [onClose]);

    return (
        <div className={css('root')}>
            <div className={css('pdfControls')}>
                <div className={css('sectionOne')}>
                    <div className={css('info')}>
                        <Typography className={css('text')} color="body" bold>{title}</Typography>
                        <Typography color="gray" className={css('subText', 'text')}>{subText}</Typography>
                    </div>
                    <PaginationControl onPageChange={pageChange} pageNum={currentPage} totalPageNum={totalPageNum} />
                </div>
                <div className={css('sectionTwo')}>
                    <ZoomSlider
                        reset={reset}
                        handleChange={onScaleChange}
                    />
                    <div className={css('uploadedInfo')}>
                        {uploadedBy && (
                            <>
                                <Typography color="gray">UPLOADED BY: </Typography>
                                <div className={css('uploadedDesc', 'text')}>{uploadedBy}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className={css('closeButton')}>
                <IconButton
                    aria-label="Close Pdf Viewer"
                    onClick={onClose}
                    color="inherit"
                >
                    <Close />
                </IconButton>
            </div>
        </div>

    );
};

export default PdfControls;
