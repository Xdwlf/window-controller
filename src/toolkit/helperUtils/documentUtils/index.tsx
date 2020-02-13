
import { FILE } from '@toolkit/enums';

export type FileTypes = FILE.DOC | FILE.DOCX | FILE.PDF | FILE.TIF | FILE.TIFF | FILE.XLS | FILE.XLSX | FILE.XML | FILE.PBFX

export const isArrayBuffer = (input: string | Uint8Array): input is Uint8Array => typeof input === 'object' && input !== null && input.byteLength !== undefined;

export const cleanFileType = (fileType: string): FileTypes =>
    fileType.toLowerCase().trim().split('').filter((val) => val !== '.')
        .join('') as FileTypes;

export const cleanFileName = (name: string): any =>
    name.toLowerCase().trim().split('.')[0];

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types

export const fileTypeToMimeType = (fileType: FileTypes): string => {
    switch (fileType) {
        case (FILE.DOC):
            return 'application/msword';
        case (FILE.DOCX):
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        case (FILE.PDF):
            return 'application/pdf';
        case (FILE.XLS):
            return 'application/vnd.ms-excel';
        case (FILE.XLSX):
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        case (FILE.TIF):
        case (FILE.TIFF):
            return 'image/tiff';
        case (FILE.XML):
            return 'text/xml';
        default:
            return 'text/plain';
    }
};

export const base64ToArrayBuffer = (base64: string): Uint8Array => {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    const asciiByteArray = bytes.map((value, idx) => binaryString.charCodeAt(idx));
    return asciiByteArray;
};

export const arrayBufferToBlob = (byte: Uint8Array, fileType: FileTypes): Blob => {
    return new Blob([byte], { type: fileTypeToMimeType(fileType) });
}

export const byteToUrl = (byte: Uint8Array, fileType: FileTypes): string => {
    return window.URL.createObjectURL(arrayBufferToBlob(byte, fileType));
};

export const triggerLinkDownload = (url: string, fileName: string): void => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
};

export const saveByteArray = (reportName: string, byte: Uint8Array, fileType: FileTypes): void => {
    const url = byteToUrl(byte, fileType);
    triggerLinkDownload(url, reportName);
    window.URL.revokeObjectURL(url);
};


export const downloadByteArray = (reportName: string, base64: string, fileType: string): void => {
    const byteArray = base64ToArrayBuffer(base64);
    saveByteArray(reportName, byteArray, fileType.toLowerCase() as FileTypes);
};
