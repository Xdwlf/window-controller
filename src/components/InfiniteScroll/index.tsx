import React, { ReactNode, ReactElement, HTMLProps } from 'react';

interface Props<T> extends HTMLProps<T> {
    tag?: keyof HTMLElementTagNameMap;
    offset?: number;
    loading: boolean;
    hasMore: boolean;
    loader?: ReactNode;
    loadMore(): unknown;
    children?: ReactNode;
}

const InfiniteScroll = (props: Props<HTMLElement>): ReactElement => {
    const {
        tag = 'div',
        offset = 250,
        loader = 'Loading...',
        loading,
        children,
        loadMore,
        hasMore,
        ...rest
    } = props;
    const listRef = React.useRef<HTMLElement>(null);
    const loadMoreRef = React.useRef(loadMore);

    React.useEffect(() => {
        loadMoreRef.current = loadMore;
    });

    // this effect is used for when the parent is too large in height
    // and wont show a scroll bar (so a scroll event will never happen)
    // but there are still results to be shown,
    // this calls the api until there is a scroll bar or "hasMore" is false
    React.useLayoutEffect(() => {
        if (loading === true || hasMore === false) return;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const currentNode = listRef.current;
                if (currentNode === null || currentNode.parentElement === null) return;
                const scrollBarWontExist: boolean = currentNode.offsetHeight < currentNode.parentElement.offsetHeight;
                if (scrollBarWontExist) {
                    loadMoreRef.current();
                }
            });
        });
    }, [hasMore, loading]);

    React.useEffect(() => {
        function onScroll(e: Event): void {
            if (loading || hasMore === false) return;
            const target = e.target as HTMLElement;
            const containerHeight = target.scrollHeight - target.offsetHeight;
            const currentPosition = target.scrollTop + offset;
            if (currentPosition >= containerHeight) {
                loadMoreRef.current();
            }
        }
        const target = listRef.current && listRef.current.parentElement;
        if (target !== null) {
            target.addEventListener('scroll', onScroll);
        }
        return (): void => {
            if (target) {
                target.removeEventListener('scroll', onScroll);
            }
        };
    });
    const restProps: any = rest;
    const loaderComponent = loading ? loader : null;
    const childrenNode = [children, loaderComponent];
    return React.createElement(tag, { ...restProps, ref: listRef }, childrenNode);
};

export default InfiniteScroll;
