import React, { useState } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Typography from '@components/Typography';
import { useDebounce } from '@hooks/useDebounce';
import useDidUpdate from '@hooks/useDidUpdate';
import { SpTypography } from 'types/material';

type DebouncedInputProps = {
    handleChange: Function;
    onLiveChange?: (value: string) => void;
    children?: React.ReactNode;
    labelColor?: keyof SpTypography;
    delay: number;
    variant?: any;
    defaultValue?: string;
}

type CustomDebouncedInputProps = DebouncedInputProps & Partial<TextFieldProps>

const DebouncedInput = ({
    handleChange, children, delay, variant = 'standard', labelColor, className, defaultValue, onLiveChange, ...inputProps
}: CustomDebouncedInputProps): JSX.Element => {
    const [value, setValue] = useState(defaultValue || '');
    const handleChangeRef = React.useRef(handleChange);
    const liveChangeRef = React.useRef(onLiveChange);

    React.useEffect(() => {
        handleChangeRef.current = handleChange;
        liveChangeRef.current = onLiveChange;
    });

    const debouncedInputValue = useDebounce(value, delay);

    useDidUpdate(() => {
        handleChangeRef.current(debouncedInputValue);
    }, [debouncedInputValue]);

    const setChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
        if (liveChangeRef.current) {
            liveChangeRef.current(e.target.value);
        }
    };

    return (
        <TextField
            value={value}
            variant={variant}
            onChange={setChange}
            {...inputProps}
            className={className}
            label={<Typography color={labelColor}>{children}</Typography>}
        />
    );
};

export default DebouncedInput;

DebouncedInput.defaultProps = {
    delay: 500,
};
