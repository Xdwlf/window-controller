import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { hexToRgb, cssBind } from '@toolkit/helperUtils';
import Typography, { TypographyProps } from '@components/Typography';
import styles from './badge.less';

const css = cssBind(styles);

type Ref = HTMLElement;

export const rgbaToRgba = (rgb: string): string => {
    const temp = rgb.replace(/[^\d.]/g, (removedChar: string) => {
        if (removedChar === ',') return ',';
        return '';
    });
    // temp will look like "24,184,107,0.12"
    return `rgba(${temp.split(',').slice(0, -1).join(',')},0.1)`;
};

export const rgbToRgba = (rgb: string): string => {
    const temp = rgb.replace(/[^\d.]/g, (removedChar: string) => {
        if (removedChar === ',') return ',';
        return '';
    });
    // temp will look like "24,184,107"
    return `rgba(${temp.split(',').join(',')},0.1)`;
};

export const hexTpRgba = (string: string): string => {
    const rgbObj = hexToRgb(string);
    if (rgbObj === null) return '';
    return `rgba(${Object.values(rgbObj).join(',')},0.1)`;
};

const Badge = React.forwardRef<Ref, TypographyProps<HTMLElement>>((props: TypographyProps<HTMLElement>, ref) => {
    const theme = useTheme();
    const {
        color = 'primary',
        className,
        children,
        ...rest
    } = props;

    const getBackground = (): string => {
        const colorItem: string = theme.text[color];
        if (colorItem) {
            const isHex: boolean = colorItem.includes('#');
            const isRgba: boolean = colorItem.includes('rgba');
            const isRgb: boolean = colorItem.includes('rgb') && !isRgba;
            if (isHex) return hexTpRgba(colorItem);
            if (isRgba) return rgbaToRgba(colorItem);
            if (isRgb) return rgbToRgba(colorItem);
            return '';
        }
        throw new Error(`${color} does not exist on theme.`);
    };
    const style = {
        backgroundColor: getBackground(),
    };
    return (
        <Typography className={css('badge', className)} color={color} style={style} {...rest} ref={ref}>
            {children}
        </Typography>
    );
});

export default Badge;
