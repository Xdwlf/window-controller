import React, { ReactNode } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Button from '@material-ui/core/Button';
import { cssBind } from '@toolkit/helperUtils';
import styles from './Drawer.less';

const css = cssBind(styles);

type DrawerContentProps = {
    open: boolean;
    width?: number;
    children?: ReactNode;
    transitionTime: number;
    shouldRenderChildren: boolean;
}

type DrawerControlProps = {
    className?: string;
    children?: ReactNode;
}

type DrawerProps = {
    controls: JSX.Element;
    children: JSX.Element;
    transitionTime?: number;
    onClose: () => void;
    width?: number;
    open: boolean;
}

const DrawerControls = (props: DrawerControlProps): JSX.Element => {
    const { children } = props;
    return (
        <div className={css('toggleBar')}>
            {children}
        </div>
    );
};

const DrawerContent = (props: DrawerContentProps): JSX.Element => {
    const {
        children, open, shouldRenderChildren, width, transitionTime,
    } = props;

    const transitionSeconds = (transitionTime / 1000).toFixed(2);

    const style = {
        minWidth: `${width}px`,
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: `transform ${transitionSeconds}s cubic-bezier(0, 0, 0.2, 1) 0ms`,
    };

    return (
        <div
            style={style}
            aria-expanded={open ? 'true' : 'false'}
            className={css('drawerContent')}
        >
            {shouldRenderChildren && (
                <div className={css('contentContainer')} role="menu">
                    {children}
                </div>
            )}
        </div>
    );
};


const Drawer = ({
    transitionTime, controls, children, open = false, width = 350, onClose,
}: DrawerProps): JSX.Element => {
    const defaultTransitionTime = 250;
    const transition = transitionTime || defaultTransitionTime;

    const closeDrawer = (): void => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                onClose();
            });
        });
    };


    const closeButton = (
        <div
            key="close"
            className={css('closeButtonContainer')}
        >
            <Button
                variant="text"
                aria-label="Close"
                className={css('closeButton')}
                onClick={closeDrawer}
            >
                <KeyboardBackspace color="primary" />
            </Button>
        </div>
    );

    return (
        <ClickAwayListener onClickAway={closeDrawer}>
            <div className={css('drawerPaper')}>
                <DrawerControls>
                    {open ? closeButton : controls}
                </DrawerControls>
                <DrawerContent
                    open={open}
                    transitionTime={transition}
                    shouldRenderChildren={open}
                    width={width}
                >
                    {children}
                </DrawerContent>
            </div>
        </ClickAwayListener>
    );
};

export default Drawer;
