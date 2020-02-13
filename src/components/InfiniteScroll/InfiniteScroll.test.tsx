import React, { ReactNode } from 'react';
import {
    render, waitForElement, fireEvent, queryByAttribute,
} from '@testing-library/react';
import { noop } from '@babel/types';
import InfiniteScroll from './index';

function getItems(count: number, height?: number): JSX.Element[] {
    return Array.from(
        Array(count), (_, i): JSX.Element => <div style={{ height: `${height || 100}px` }} key={i}>item {i}</div>
    );
}

describe('<InfiniteScroll />', () => {
    test('InfiniteScroll should show loading and not crash with no items', () => {
        const { getByText, queryByText } = render(
            <InfiniteScroll
                hasMore
                loading
                loadMore={noop}
                loader="loading"
            />
        );
        expect(getByText('loading')).toBeInTheDocument();
        expect(queryByText('item', { exact: false })).toBe(null);
    });
    test('InfiniteScroll should not show loading and not crash with no items', () => {
        const { queryByText } = render(
            <InfiniteScroll
                hasMore={false}
                loading={false}
                loadMore={noop}
                loader="loading"
            />
        );
        expect(queryByText('loading')).toBe(null);
        expect(queryByText('item', { exact: false })).toBe(null);
    });
    test('InfiniteScroll should show children and not loading', () => {
        const { queryByText } = render(
            <InfiniteScroll
                hasMore={false}
                loading={false}
                loadMore={noop}
                loader="loading"
            >
                {getItems(10)}
            </InfiniteScroll>
        );
        expect(queryByText('loading')).toBe(null);
        expect(queryByText('item 0')).toBeInTheDocument();
    });
    test('InfiniteScroll should call more items', () => {
        const getById = queryByAttribute.bind(null, 'id');
        const fn = jest.fn();
        const { queryByText, container } = render(
            <div id="scroll">
                <InfiniteScroll
                    loading={false}
                    loadMore={fn}
                    hasMore
                    loader="loading"
                >
                    {getItems(10)}
                </InfiniteScroll>
            </div>
        );
        const domNode = getById(container, 'scroll');
        fireEvent.scroll(domNode!, { target: domNode });
        expect(queryByText('loading')).toBe(null);
        expect(queryByText('item 0')).toBeInTheDocument();
        expect(fn).toHaveBeenCalledTimes(1);
    });
    test('InfiniteScroll should call "loadMore" then not call it if loading', async () => {
        const getById = queryByAttribute.bind(null, 'id');
        const fn = jest.fn();
        const Component = (): JSX.Element => {
            const [loading, setLoading] = React.useState(false);
            const loadMore = (): void => {
                setLoading(true);
                fn();
            };

            return (
                <div id="scroll">
                    <InfiniteScroll
                        hasMore
                        loading={loading}
                        loadMore={loadMore}
                        loader="loading"
                    >
                        {getItems(10)}
                    </InfiniteScroll>
                </div>
            );
        };

        const { getByText, container, queryByText } = render(<Component />);
        const domNode = getById(container, 'scroll');
        fireEvent.scroll(domNode!, { target: domNode });
        await waitForElement(() => queryByText('loading'), { container });
        fireEvent.scroll(domNode!, { target: domNode }); // shouldnt call loadMore
        fireEvent.scroll(domNode!, { target: domNode }); // shouldnt call loadMore
        expect(getByText('item 0')).toBeInTheDocument();
        expect(fn).toHaveBeenCalledTimes(1);
    });
    test('InfiniteScroll should call "loadMore" then not call it if "hasMore" is false', async () => {
        const getById = queryByAttribute.bind(null, 'id');
        const fn = jest.fn();
        const Component = (): JSX.Element => {
            const [data, setData] = React.useState({ loading: false, hasMore: true, count: 5 });

            const loadMore = (): void => {
                setData({ ...data, loading: true });
                setTimeout(() => {
                    setData({
                        ...data,
                        loading: false,
                        count: data.count + 5,
                        hasMore: false,
                    });
                }, 200);
                fn();
            };

            return (
                <div id="scroll">
                    <InfiniteScroll
                        hasMore={data.hasMore}
                        loading={data.loading}
                        loadMore={loadMore}
                        loader="loading"
                    >
                        {getItems(data.count)}
                    </InfiniteScroll>
                </div>
            );
        };

        const { getByText, container, queryByText } = render(<Component />);
        const domNode = getById(container, 'scroll');

        fireEvent.scroll(domNode!, { target: domNode });
        await waitForElement(() => queryByText('loading'), { container });

        fireEvent.scroll(domNode!, { target: domNode }); // shouldnt call loadMore
        expect(fn).toHaveBeenCalledTimes(1);

        await waitForElement(() => queryByText('item 9'), { container });
        expect(getByText('item 9')).toBeInTheDocument();

        fireEvent.scroll(domNode!, { target: domNode }); // shouldnt call loadMore
        expect(fn).toHaveBeenCalledTimes(1);
    });
    test('InfiniteScroll should call "loadMore" then not call it if "loading" then call it again', async () => {
        const getById = queryByAttribute.bind(null, 'id');
        const fn = jest.fn();
        const Component = (): JSX.Element => {
            const [data, setData] = React.useState({ loading: false, hasMore: true, count: 5 });

            const loadMore = (): void => {
                setData({ ...data, loading: true });
                setTimeout(() => {
                    setData({
                        ...data,
                        loading: false,
                        count: data.count + 5,
                    });
                }, 200);
                fn();
            };

            return (
                <div id="scroll">
                    <InfiniteScroll
                        hasMore={data.hasMore}
                        loading={data.loading}
                        loadMore={loadMore}
                        loader="loading"
                    >
                        {getItems(data.count)}
                    </InfiniteScroll>
                </div>
            );
        };

        const { getByText, container, queryByText } = render(<Component />);
        const domNode = getById(container, 'scroll');

        fireEvent.scroll(domNode!, { target: domNode }); // first call
        await waitForElement(() => queryByText('loading'), { container });

        fireEvent.scroll(domNode!, { target: domNode }); // shouldnt call loadMore
        expect(fn).toHaveBeenCalledTimes(1);

        await waitForElement(() => queryByText('item 9'), { container });
        expect(getByText('item 9')).toBeInTheDocument();

        fireEvent.scroll(domNode!, { target: domNode }); // second call

        await waitForElement(() => queryByText('item 14'), { container });
        expect(getByText('item 14')).toBeInTheDocument();

        expect(fn).toHaveBeenCalledTimes(2);
    });
});
