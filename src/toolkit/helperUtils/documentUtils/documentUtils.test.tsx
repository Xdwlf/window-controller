import {
    cleanFileType, isArrayBuffer, base64ToArrayBuffer, fileTypeToMimeType, byteToUrl, saveByteArray, cleanFileName,
} from './index';
const tinyBase64 = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';


describe('cleanFileType', () => {
    test('returns a valid file type', () => {
        expect(cleanFileType('pdf')).toBe('pdf');
        expect(cleanFileType('doc')).toBe('doc');
        expect(cleanFileType('tiff')).toBe('tiff');
    });
    test('handles periods and spaces', () => {
        expect(cleanFileType('.xlsx')).toBe('xlsx');
        expect(cleanFileType('.pdf')).toBe('pdf');
        expect(cleanFileType(' .doc')).toBe('doc');
        expect(cleanFileType('xml ')).toBe('xml');
    });
});

test('cleanFileName returns a file name without file type', () => {
    expect(cleanFileName('head-and-neck-injuries-in-heavy-metal.pdf')).toBe('head-and-neck-injuries-in-heavy-metal');
    expect(cleanFileName(' head-bangers-stuck-between-rock-and-a-hard-bass  ')).toBe('head-bangers-stuck-between-rock-and-a-hard-bass');
});

test('base64ToArrayBuffer turns a base64 array to a Uint8Array', () => {
    expect(isArrayBuffer(base64ToArrayBuffer(tinyBase64))).toBeTruthy()
});

test('fileTypeToMimeType returns the correct mime type', () => {
    expect(fileTypeToMimeType('pdf' as any)).toBe('application/pdf')
    expect(fileTypeToMimeType('docx' as any)).toBe('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    expect(fileTypeToMimeType('pdasdff' as any)).toBe('text/plain')
})