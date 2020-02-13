import React, {
    HTMLProps, ReactElement,
} from 'react';
import { cssBind } from '@toolkit/helperUtils';
import { fill } from 'lodash';
import styles from './Skeleton.less';

const css = cssBind(styles);

export type SkeletonClassKey = 'root' | 'text' | 'rect' | 'circle' | 'animate';

interface SkeletonProps<T> extends HTMLProps<T> {
    className?: string;
    tag?: keyof HTMLElementTagNameMap;
    disableAnimate?: boolean;
    height?: number | string;
    width?: number | string;
    variant?: 'text' | 'rect' | 'circle';
}

export interface SkeletonListProps<T> extends HTMLProps<T> {
    tag?: keyof HTMLElementTagNameMap;
    children: ReactElement;
    count: number;
}

type Ref = HTMLElement;

export const getRandomNum = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min);

export function SkeletonList(props: SkeletonListProps<HTMLElement>): JSX.Element {
    const {
        tag = 'div',
        count,
        ...rest
    } = props;

    const [firstChild] = React.Children.toArray(React.Children.only(props.children));
    const newChildren = fill(Array(count), firstChild)
        .map((child) => React.cloneElement(child, { key: Math.random() }));
    const extraProps = { 'aria-busy': 'true', ...rest };
    return React.createElement(tag, extraProps, newChildren);
}

const Skeleton = React.forwardRef<Ref, SkeletonProps<HTMLElement>>(
    (props: SkeletonProps<HTMLElement>, ref): JSX.Element => {
        const {
            className = '',
            tag = 'div',
            disableAnimate = false,
            height,
            variant = 'text',
            width,
            children,
            ...rest
        } = props;

        const style = {
            width,
            height,
        };

        const newClassNames = css(variant, 'root', !disableAnimate && 'animate', className);

        return React.createElement(tag, {
            style,
            className: newClassNames,
            'aria-label': 'loading',
            ...rest,
            ref,
        }, children);
    }
);


export default Skeleton;
