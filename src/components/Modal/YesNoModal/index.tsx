import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import { noop, cssBind } from '@toolkit/helperUtils';
import Typography from '@components/Typography';
import styles from './YesNoModal.less';
import Modal from '../index';

const css = cssBind(styles);

type Props = {
    open: boolean;
    onNo: () => void;
    onYes: () => void;
    title: ReactNode;
    onClose: () => void;
    children: ReactNode;
    yesCaption?: ReactNode;
    noCaption?: ReactNode;
    disablePortal?: boolean;
    disableButtons?: boolean;
}

const YesNoModal = ({
    open,
    onNo,
    onYes,
    title,
    onClose,
    children,
    noCaption = 'CANCEL',
    yesCaption = 'CONFIRM',
    disablePortal,
    disableButtons,
}: Props): JSX.Element => (
    <Modal
        open={open}
        onClose={onClose}
        disablePortal={disablePortal}
        className={css('root')}
    >
        <Modal.Title>{title}</Modal.Title>
        <Modal.Body
            className={css('body')}
        >
            {children}
        </Modal.Body>
        <Modal.Footer
            className={css('footer')}
        >
            <Button
                variant="text"
                onClick={onNo}
                disabled={disableButtons}
                className={css('footerButton')}
            >
                <Typography color="gray">
                    {noCaption}
                </Typography>
            </Button>
            <Button
                onClick={onYes}
                color="primary"
                variant="contained"
                disabled={disableButtons}
                className={css('footerButton')}
            >
                {yesCaption}
            </Button>
        </Modal.Footer>
    </Modal>
);

export default YesNoModal;
