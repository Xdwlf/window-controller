import React, { ReactNode, HTMLProps } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { SpTypography } from 'types/material';

export interface TypographyProps<T> extends HTMLProps<T> {
    tag?: keyof HTMLElementTagNameMap;
    color?: keyof SpTypography;
    children?: ReactNode;
    gutterBottom?: boolean;
    noWrap?: boolean;
    bold?: boolean;
    style?: React.CSSProperties;
}

type Ref = HTMLElement;

const Typography = React.forwardRef<Ref, TypographyProps<HTMLElement>>((props: TypographyProps<HTMLElement>, ref) => {
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
    const getColor = (): string => {
        if (theme.text[color]) {
            return theme.text[color];
        }
        throw new Error(`${color} does not exist on theme.`);
    };
    const style = {
        ...styleProp,
        color: getColor(),
        marginBottom: gutterBottom ? '5px' : null,
        whiteSpace: noWrap ? 'nowrap' : '',
        fontWeight: bold ? 'bold' : null,
    };

    return React.createElement(tag, { style, ...rest, ref }, children);
});

export default Typography;
