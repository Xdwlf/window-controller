import React from 'react';
import {
    noop, cssBind, isArrayBuffer, cleanFileType, base64ToArrayBuffer
} from '@toolkit/helperUtils';
import pdfjs, {
    PDFWorker, PDFDocumentProxy, PDFPageProxy
} from 'pdfjs-dist';
import Loading from '@material-ui/core/CircularProgress';
import { FILE } from '@toolkit/enums';
import UnsupportedDocument from './UnsupportedDocument';

import styles from './PdfContent.less';

const css = cssBind(styles);

type ContentProps = {
    document?: Uint8Array | string;
    page?: number;
    worker?: PDFWorker;
    scale?: number;
    rotation?: number;
    onPageLoaded?: () => void;
    documentType?: string;
    documentName?: string;
    isUrl?: boolean;
    onDocumentLoad?: (document: PDFDocumentProxy) => void;
}


type SetDocumentAction = {
    type: 'set-document';
    payload: PDFDocumentProxy | undefined;
}

type PageRenderingAction = {
    type: 'page-rendering';
    payload: boolean;
}

type PagePendingAction = {
    type: 'page-pending';
    payload: number | null;
}

type DocumentLoading = {
    type: 'doc-loading';
    payload: boolean;
}
type Action = SetDocumentAction | PageRenderingAction | PagePendingAction | DocumentLoading

type RenderPage = (page: PDFPageProxy) => void

type State = {
    currentDoc: PDFDocumentProxy | undefined;
    pageRendering: boolean;
    pagePending: number | null;
    docLoading: boolean;
}

const initialState: State = {
    currentDoc: undefined,
    pageRendering: false,
    pagePending: null,
    docLoading: true,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'set-document':
            return {
                ...state,
                currentDoc: action.payload,
                docLoading: true,
            };
        case 'page-rendering':
            return {
                ...state,
                docLoading: false,
                pageRendering: action.payload,
            };
        case 'page-pending':
            return {
                ...state,
                pagePending: action.payload,
            };
        case 'doc-loading':
            return {
                ...state,
                docLoading: action.payload,
            };
        default:
            return state;
    }
};


export const PdfContent = React.memo(({
    document,
    isUrl,
    page = 1,
    worker,
    scale = 1,
    rotation = 0,
    onPageLoaded = noop,
    documentType,
    documentName = 'document',
    onDocumentLoad = noop,
}: ContentProps): JSX.Element => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const canvasEl = React.useRef<HTMLCanvasElement>(null);
    const fileExtension = documentType ? cleanFileType(documentType) : undefined;
    const renderPageRef = React.useRef<RenderPage | null>(null);
    const onDocumentLoadRef = React.useRef<any>(null);

    React.useEffect(() => {
        onDocumentLoadRef.current = onDocumentLoad;
    });

    const renderPage = (pageProxy: PDFPageProxy): void => {
        const viewport = pageProxy.getViewport({ scale, rotation });
        const canvas = canvasEl.current;

        if (!canvas) return;
        const canvasContext = canvas.getContext('2d');
        if (!canvasContext) return;

        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        canvas.style.height = `${viewport.height}px`;

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = { canvasContext, viewport };

        dispatch({
            type: 'page-rendering',
            payload: true,
        });
        pageProxy.render(renderContext).promise.then(() => {
            onPageLoaded();
            dispatch({
                type: 'page-rendering',
                payload: false,
            });
            // check if there is a another page pending and render that page
            if (state.pagePending && state.currentDoc && renderPageRef.current) {
                state.currentDoc.getPage(page).then(renderPageRef.current);
                dispatch({
                    type: 'page-pending',
                    payload: null,
                });
            }
        });
    };

    React.useEffect(() => {
        renderPageRef.current = renderPage;
    });

    React.useEffect(() => {
        if (document && fileExtension === FILE.PDF) {
            let config: pdfjs.PDFSource | undefined;
            if (isUrl && typeof document === 'string') {
                config = {
                    url: document,
                    worker,
                };
            } else {
                config = {
                    data: isArrayBuffer(document) ? document : base64ToArrayBuffer(document),
                    worker,
                };
            }

            dispatch({ type: 'doc-loading', payload: true });

            pdfjs.getDocument(config).promise.then((doc) => {
                dispatch({ type: 'set-document', payload: doc });
                onDocumentLoadRef.current(doc);
            });
        }
    }, [document, worker, isUrl, fileExtension]);


    React.useEffect(() => {
        if (!state.currentDoc) return;

        const queueRenderPage = (): void => {
            if (state.pageRendering) {
                dispatch({ type: 'page-pending', payload: page });
            } else if (state.currentDoc && renderPageRef.current) {
                state.currentDoc.getPage(page).then(renderPageRef.current);
            }
        };
        queueRenderPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.currentDoc, onPageLoaded, page, rotation, scale]);

    if (fileExtension && fileExtension !== FILE.PDF && document) {
        return (
            <UnsupportedDocument
                byteArray={isArrayBuffer(document) ? document : base64ToArrayBuffer(document)}
                fileName={documentName}
                fileType={fileExtension}
            />
        );
    }

    const documentLoading = !document || !state.currentDoc || state.pageRendering || state.docLoading;
    return (
        <div className={css('pdfContent')}>
            {(documentLoading) && (
                <Loading
                    size={50}
                    aria-label="Loading Pdf"
                    aria-busy="true"
                    className={css('loadingIcon')}
                />
            )}
            <canvas
                className={css('pdfCanvas', documentLoading && 'hideCanvas')}
                ref={canvasEl}
            />
        </div>
    );
});

export default PdfContent;
