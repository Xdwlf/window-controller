declare module 'swagger-client';
declare module '*.png';
declare module '*.svg';
declare module 'pdfjs-dist/build/pdf.worker.min';

declare module '*.txt' {
    const content: string;
    export default content;
}
