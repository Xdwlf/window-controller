import React, { ReactNode, HTMLProps } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { SpTypography } from 'types/material';
import { memoize } from 'lodash';

type ColorMap = {
    [key: string]: {
        background: string;
        color: string;
    };
}
const map: ColorMap = {};

export interface ThemedBackgroundProps<T> extends HTMLProps<T> {
    tag?: keyof HTMLElementTagNameMap;
    color?: keyof SpTypography;
    children?: ReactNode;
    gutterBottom?: boolean;
    noWrap?: boolean;
    bold?: boolean;
    style?: React.CSSProperties;
}

type Ref = HTMLElement;

const ThemedBackground = React.forwardRef<Ref, ThemedBackgroundProps<HTMLElement>>((props: ThemedBackgroundProps<HTMLElement>, ref) => {
    const theme = useTheme();
    const {
        tag = 'span',
        color = 'primary',
        gutterBottom = false,
        noWrap = false,
        bold = false,
        style: styleProp,
        children,
        ...rest
    } = props;
    const getColor = (): React.CSSProperties => {
        if (theme.text[color]) {
            if (map[color]) {
                return map[color];
            }
            const obj = {
                background: theme.text[color],
                color: theme.palette.getContrastText(theme.text[color]),
            };
            map[color] = obj;
            return obj;
        }
        throw new Error(`${color} does not exist on theme.`);
    };
    const style = {
        ...styleProp,
        ...getColor(),
        marginBottom: gutterBottom ? '5px' : null,
        whiteSpace: noWrap ? 'nowrap' : '',
        fontWeight: bold ? 'bold' : null,
    };

    return React.createElement(tag, { style, ...rest, ref }, children);
});

export default ThemedBackground;
