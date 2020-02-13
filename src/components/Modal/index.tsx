import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions, { DialogActionsProps } from '@material-ui/core/DialogActions';
import DialogContent, { DialogContentProps } from '@material-ui/core/DialogContent';
import DialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { cssBind, noop } from '@toolkit/helperUtils';
import { IconButton } from '@material-ui/core';
import styles from './modal.less';

const css = cssBind(styles);

interface SpModal extends DialogProps {
    quickClose?: boolean;
    onClose?: () => void;
}

type Context = {
    onClose?: () => void;
}
const defaultContext = { onClose: noop };
const ModalContext = React.createContext<Context>(defaultContext);

const useToggleContext = (): Context => {
    const context = React.useContext(ModalContext);
    if (!context) {
        throw new Error('Modal compound components cannot be rendered outside the Modal component');
    }
    return context;
};
class Modal extends React.Component<SpModal> {
    public static Title(props: DialogTitleProps): JSX.Element {
        const { onClose } = useToggleContext();
        const { children } = props;
        return (
            <DialogTitle disableTypography {...props}>
                <h2 className={css('title')}>{children}</h2>
                {onClose ? (
                    <IconButton
                        aria-label="Close"
                        color="inherit"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    }

    public static Body(props: DialogContentProps): JSX.Element {
        return <DialogContent {...props} />;
    }

    public static Footer(props: DialogActionsProps): JSX.Element {
        return <DialogActions {...props} />;
    }

    public render(): JSX.Element {
        const {
            maxWidth = 'sm',
            fullWidth = true,
            quickClose = true,
            hideBackdrop = false,
            onClose,
            children,
            ...rest
        } = this.props;
        const value: Context = { onClose };
        return (
            <Dialog
                keepMounted={false}
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                disableBackdropClick={quickClose}
                disableEscapeKeyDown={quickClose}
                onClose={onClose}
                hideBackdrop={hideBackdrop}
                {...rest}
            >
                <ModalContext.Provider value={value}>
                    {children}
                </ModalContext.Provider>
            </Dialog>
        );
    }
}

export default Modal;

/**
 * renders a modal
 * @example
 *  <Modal open title="some title" handleClose={() => {}}>
 *  <Modal.Body>body</Modal.Body>
 *  <Modal.Footer>
 *      <Button>Click</Button>
 *  </Modal.Footer>
 *  </Modal>
 * @example
 * @returns {JSX.Element} Modal COmponent
 */
