import React from 'react';
import useDidUpdate from '@hooks/useDidUpdate';

let titleStorage: symbol[] = [Symbol(document.title)];

const useDocumentTitle = (title: string | undefined): void => {
    const symbolRef = React.useRef<symbol>(Symbol(title));

    const setTitleToLast = (arr: symbol[]): void => {
        const desc = arr[arr.length - 1]?.description;
        if (desc) {
            document.title = desc;
        }
    };

    useDidUpdate(() => {
        const newTitle = Symbol(title);
        titleStorage = titleStorage.map(item => ((item === symbolRef.current) ? newTitle : item));
        symbolRef.current = newTitle;
        setTitleToLast(titleStorage);
    }, [title]);


    React.useEffect(() => {
        titleStorage.push(symbolRef.current);
        setTitleToLast(titleStorage);
        return (): void => {
            titleStorage.pop();
            setTitleToLast(titleStorage);
        };
    }, []);
};

export default useDocumentTitle;
