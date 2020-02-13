import React, { HTMLProps, ReactElement } from 'react';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { cssBind } from '@toolkit/helperUtils';
import ThemedBackground from '@components/ThemedBackground';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@components/Typography';
import styles from './document-row.less';

const css = cssBind(styles);

interface Props<T> extends HTMLProps<T> {
    children: ReactElement | ReactElement[];
    selected?: boolean;
}
const DocumentRow = (props: Props<HTMLElement>): React.ReactElement<HTMLLIElement> => {
    const [open, setOpen] = React.useState<boolean>(false);
    const ariaId = React.useRef(props.id || Math.random().toFixed(10).slice(2));

    const {
        children,
        className,
        selected,
    } = props;
    const [mainContent, menuContent] = React.Children.toArray(children);
    const hasMenu = menuContent !== undefined;
    return (
        <ClickAwayListener
            mouseEvent={open ? 'onClick' : false}
            onClickAway={(): void => setOpen(false)}
        >
            <li
                className={css('root', className, selected && 'selected')}
            >
                <Typography tag="div" color="secondary">
                    {mainContent}
                </Typography>
                {hasMenu
                    ? (
                        <ThemedBackground
                            color="secondary"
                            tag="div"
                            role="menu"
                            className={css('menu', open && 'open')}
                            aria-labelledby={ariaId.current}
                        >
                            {menuContent}
                        </ThemedBackground>
                    ) : null}
                {hasMenu
                    ? (
                        <Typography
                            tag="div"
                            className={css('iconButtonContainer')}
                            color={open ? 'white' : 'secondary'}
                        >
                            <IconButton
                                color="inherit"
                                className={css('iconButton')}
                                id={ariaId.current}
                                aria-haspopup="true"
                                aria-label={`${open ? 'close' : 'open'} document menu`}
                                aria-expanded={open ? 'true' : undefined}
                                onClick={(): void => setOpen(!open)}
                                size="small"
                            >
                                {open ? <CloseIcon /> : <MoreHoriz />}
                            </IconButton>
                        </Typography>
                    ) : null}
            </li>
        </ClickAwayListener>
    );
};
export default DocumentRow;
