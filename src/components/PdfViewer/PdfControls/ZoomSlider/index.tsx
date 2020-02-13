import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Slider from '@material-ui/core/Slider';
import Typography from '@components/Typography';
import { useDebounce } from '@hooks/useDebounce';
import useDidUpdate from '@hooks/useDidUpdate';
import { cssBind } from '@toolkit/helperUtils';
import styles from './ZoomSlider.less';

const css = cssBind(styles);

const min = 0.25;
const max = 3;
const step = 0.01;
const delay = 500;
export const initialSliderValue = (max + min) / 2;

type Props = {
    handleChange: (val: number) => void;
    initialScale?: number;
    reset?: boolean;
}

const ZoomSlider = ({ handleChange, reset, initialScale = initialSliderValue }: Props): JSX.Element => {
    const [value, setValue] = React.useState(initialScale);
    const handleChangeCallback = React.useCallback(handleChange, [handleChange]);
    const debouncedValue = useDebounce(value, delay);

    useDidUpdate(() => {
        handleChangeCallback(Number(debouncedValue.toFixed(2)));
    }, [debouncedValue]);

    useDidUpdate(() => {
        setValue(initialScale);
    }, [reset]);

    const calculatePercentage = (currentValue: number): number => {
        const currentPercentage = (currentValue - min) / (max - min);
        return Math.max(1, Math.floor(currentPercentage * 100));
    };

    return (
        <div className={css('root')}>
            <IconButton
                size="small"
                aria-label="Zoom Out"
                onClick={(): void => { setValue(Math.max(min, value - 0.1)); }}
                className={css('iconButton')}
            >
                <RemoveCircle color="primary" />
            </IconButton>
            <Slider
                min={min}
                max={max}
                step={step}
                value={value}
                className={css('slider')}
                aria-label="Zoom Slider"
                getAriaValueText={(sliderValue: number): string => `${calculatePercentage(sliderValue)} Percent Zoom`}
                onChange={(event: React.ChangeEvent<{}>, val): void => { setValue(val as number); }}
            />
            <IconButton
                size="small"
                aria-label="Zoom In"
                onClick={(): void => { setValue(Math.min(max, value + 0.1)); }}
                className={css('iconButton')}
            >
                <AddCircle color="primary" />
            </IconButton>
            <Typography
                color="primary"
                className={css('percentage')}
            >
                {calculatePercentage(value)}%
            </Typography>

        </div>
    );
};

export default ZoomSlider;
