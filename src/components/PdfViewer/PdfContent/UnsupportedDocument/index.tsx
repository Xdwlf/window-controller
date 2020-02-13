import React from 'react';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { saveAs } from 'file-saver'
import {
    FileTypes, cssBind, saveByteArray, cleanFileName, arrayBufferToBlob
} from '@toolkit/helperUtils';
import Typography from '@components/Typography';
import styles from './UnsupportedDocument.less';

const css = cssBind(styles);

type Props = {
    byteArray: Uint8Array;
    fileName: string;
    fileType: FileTypes;
}

const UnsupportedDocument = (
    { byteArray, fileName, fileType }: Props
): JSX.Element => {
    const handleDownload = (): void => {
        const blob = arrayBufferToBlob(byteArray, fileType);
        const downloadName = `${cleanFileName(fileName)}.${fileType}`
        saveAs(blob, downloadName)
    };
    return (
        <Typography color="white" tag="div" className={css('root')}>
            <div className={css('iconSection')}>
                <InsertDriveFile
                    className={css('driveIcon')}
                    color="inherit"
                />
                <Typography color="body">
                    <VisibilityOff
                        className={css('eyeIcon')}
                        color="inherit"
                    />
                </Typography>
            </div>
            <div className={css('descriptionText')}>
                We can&apos;t preview this file type.
            </div>
            <div className={css('descriptionText')}>
                Try downloading the file to view it.
            </div>
            <Button
                color="primary"
                variant="contained"
                className={css('downloadButton')}
                onClick={handleDownload}
            >
                DOWNLOAD
            </Button>
        </Typography>
    );
};
export default UnsupportedDocument;
