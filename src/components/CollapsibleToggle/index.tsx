import React, { useState, ReactNode } from 'react';
import { noop, cssBind } from '@toolkit/helperUtils';
import useDidUpdate from '@hooks/useDidUpdate';
import ArrowDropDownCircle from '@material-ui/icons/ArrowDropDownCircle';
import ButtonBase, { ExtendButtonBase, ButtonBaseTypeMap } from '@material-ui/core/ButtonBase';
import Collapse from '@material-ui/core/Collapse';
import styles from './CollapsibleToggle.less';

const css = cssBind(styles);

type Props = {
    children: ReactNode;
    open?: boolean;
    onClick?: () => void;
    isDefaultOpen?: boolean;
    className?: string;

}

type HeaderProps = {
    children: ReactNode;
    className?: string;
    buttonProps?: ExtendButtonBase<ButtonBaseTypeMap>;
    buttonClassName?: string;
    rightIcon?: ReactNode;
    disabled?: boolean;
}

type ContentProps = {
    children: ReactNode;
}

type Context = {
    onClick: () => void;
    open: boolean;
    hasMounted: boolean;
}

const defaultCollapsibleContext = {
    onClick: noop,
    open: false,
    hasMounted: false,
};

const CollapsibleContext = React.createContext<Context>(defaultCollapsibleContext);

const useToggleContext = (): Context => {
    const context = React.useContext(CollapsibleContext);
    if (!context) {
        throw new Error('Collapsible compound components cannot be rendered outside the Collapsible component');
    }
    return context;
};

const CollapsibleHeader = ({
    children, rightIcon, className, buttonClassName, buttonProps, disabled,
}: HeaderProps): JSX.Element => {
    const { onClick, open } = useToggleContext();
    const icon = rightIcon ?? (
        <ArrowDropDownCircle
            className={css('arrowIcon', open && 'opened')}
            color="secondary"
        />
    );

    return (
        <ButtonBase
            disabled={disabled}
            disableRipple
            className={css('headerButton', buttonClassName)}
            onClick={onClick}
            {...buttonProps}
        >
            <div className={css('headerContent', className)}>
                {children}
            </div>
            <div className={css('headerIcon')}>
                {icon}
            </div>
        </ButtonBase>

    );
};

const CollapsibleContent = ({ children }: ContentProps): JSX.Element => {
    const { open, hasMounted } = useToggleContext();
    return (
        <Collapse in={open}>
            {
                hasMounted && children
            }
        </Collapse>
    );
};

const CollapsibleToggle = ({
    children, open, onClick = noop, isDefaultOpen = false, className,
}: Props): JSX.Element => {
    const [isOpen, setIsOpen] = useState(isDefaultOpen);
    const [hasMounted, setHasMounted] = useState(isDefaultOpen || open || false);
    const isControlledComponent = open === true || open === false;

    if (isControlledComponent && isDefaultOpen) {
        // eslint-disable-next-line no-console
        console.warn('isDefaultOpen cannot be used in a Controlled Collapsible Toggle. Please remove.');
    }

    useDidUpdate(() => {
        if (open && !hasMounted) {
            setHasMounted(true);
        }
    }, [open]);

    const handleInternalToggle = (): void => {
        if (!isOpen) setHasMounted(true);
        setIsOpen(!isOpen);
    };

    const handleToggle = (): void => {
        if (isControlledComponent) setHasMounted(true);
        else handleInternalToggle();
        onClick();
    };

    const value: Context = { onClick: handleToggle, open: open ?? isOpen, hasMounted };
    return (
        <CollapsibleContext.Provider
            value={value}
        >
            <div className={css('root', className)}>
                {children}
            </div>
        </CollapsibleContext.Provider>
    );
};

CollapsibleToggle.Header = CollapsibleHeader;
CollapsibleToggle.Content = CollapsibleContent;
export default CollapsibleToggle;
