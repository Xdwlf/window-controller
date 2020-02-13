import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { cssBind } from '@toolkit/helperUtils';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles, Theme } from '@material-ui/core/styles';

import styles from './SnackbarItem.less';
import { SnackbarType } from '.';

const css = cssBind(styles);

export const variantIcon = {
    success: <CheckCircleIcon />,
    warning: <WarningIcon />,
    error: <InfoIcon />,
    info: <InfoIcon />,
};

export type SnackbarItemProps = {
    snackbar: SnackbarType;
    removeSnackbar: (id: string) => void;
    autoHideDuration?: number;
}

type ClassesType = {
    [key: string]: string;
}


const useStyles = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: theme.text.success,
        transition: 'max-height 0.3s ease-out',
    },
    error: {
        backgroundColor: theme.text.error,
    },
    info: {
        backgroundColor: theme.text.highlight,
    },
    warning: {
        backgroundColor: theme.text.warning,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));


const SnackbarItem = (props: SnackbarItemProps): JSX.Element => {
    const {
        snackbar, removeSnackbar, autoHideDuration = 5000,
    } = props;

    const [mounted, setMounted] = useState(false);
    const [unmounting, setUnmounting] = useState(false);

    const Icon = variantIcon[snackbar.type];
    const classes: ClassesType = useStyles();

    useEffect(() => {
        setMounted(true);
        let timer: number | undefined;
        if (!snackbar.disableAutoHide) {
            timer = window.setTimeout(() => {
                setUnmounting(true);
            }, autoHideDuration);
        }
        return (): void => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [autoHideDuration, snackbar, snackbar.disableAutoHide]);

    const activateFadeOut = (): void => {
        setUnmounting(true);
    };
    return (
        <Snackbar
            className={css('snackbarItem', mounted && 'mounted', unmounting && 'flyingAway')}
            onExited={(): void => removeSnackbar(snackbar.id)}
            open={!unmounting}
        >
            <SnackbarContent
                className={css('contentWrapper', classes[snackbar.type.toString()])}
                message={(
                    <>
                        {Icon}
                        <span className={css('snackbarMessage')}>
                            {snackbar.message}
                        </span>
                    </>
                )}
                action={[
                    <IconButton
                        className={css(classes.icon)}
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={activateFadeOut}
                    >
                        <CloseIcon
                            fontSize="inherit"

                        />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
};

export default SnackbarItem;
