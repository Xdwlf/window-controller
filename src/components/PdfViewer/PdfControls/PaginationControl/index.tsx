/* eslint-disable consistent-return */
import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import CheckCircle from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import { noop, cssBind } from '@toolkit/helperUtils';

import styles from './PaginationControls.less';

const css = cssBind(styles);

const useStyles = makeStyles({
    button: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
});

type Props = {
    onPageChange: (n: number) => void;
    pageNum: number;
    totalPageNum: number;
}

export const PaginationControls = ({
    onPageChange = noop, pageNum, totalPageNum,
}: Props): JSX.Element => {
    const [inputVal, setInputVal] = React.useState<'' | number>(1);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const theme = useTheme();
    const numControls = 3;
    const numVisibleControls = numControls + 1;
    const classes = useStyles();

    const buttonSelectedStyle = {
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
    };

    React.useEffect(() => {
        setInputVal(pageNum);
    }, [pageNum]);

    const validatePageChange = (newPage: number): void => {
        if (newPage >= 1 && newPage <= totalPageNum && newPage !== pageNum) {
            onPageChange(newPage);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value.length == 0) {
            setInputVal('');
            return;
        }
        const numInput = parseInt(event.target.value, 10);
        if (typeof numInput === 'number' && !Number.isNaN(numInput) && numInput < 10000) {
            setInputVal(numInput);
        }
    };

    const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        // If the enter key is pressed
        if (event.keyCode === 13 && typeof inputVal === 'number') {
            validatePageChange(inputVal);
        }
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>): void =>
        setAnchorEl(event.currentTarget);

    const handleCloseMenu = (): void => setAnchorEl(null);

    const changePage = (value: number, func: Function = noop) => (): void => {
        validatePageChange(value);
        func(value);
    };

    const renderNumButtons = (): JSX.Element[] => {
        let numOfItems;
        if (totalPageNum >= numControls) numOfItems = numControls;
        else numOfItems = totalPageNum;
        return [...Array(numOfItems)].map((val, index) => {
            const style = (index + 1 === pageNum) ? buttonSelectedStyle : {};
            return (
                <ButtonBase
                    style={style}
                    aria-label={`Page ${index + 1}`}
                    className={css('numButton')}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`page${index + 1}`}
                    onClick={changePage(index + 1)}
                >
                    {index + 1}
                </ButtonBase>
            );
        });
    };

    const renderDropdownItems = (): JSX.Element[] => {
        const numOfItems = totalPageNum - numControls - 1;
        return [...Array(numOfItems)].map((val, index) => (
            <MenuItem
                className={css('menuItem')}
                key={Math.random().toString()}
                onClick={changePage(index + numVisibleControls, handleCloseMenu)}
            >
                {index + numVisibleControls}
            </MenuItem>
        ));
    };

    const renderMoreButton = (): JSX.Element | undefined => {
        if (totalPageNum <= numVisibleControls) return;
        const style = (pageNum > 3 && pageNum !== totalPageNum) ? buttonSelectedStyle : {};

        return (
            <>
                <ButtonBase
                    style={style}
                    aria-haspopup="true"
                    aria-label="More Pages"
                    aria-controls="page-menu"
                    className={css('moreButton')}
                    onClick={handleOpenMenu}
                >
                    <MoreHoriz className={css('moreIcon')} />
                </ButtonBase>
                <Menu
                    id="page-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    {renderDropdownItems()}
                </Menu>
            </>

        );
    };

    const renderLastPageButton = (): JSX.Element | undefined => {
        if (totalPageNum <= 3) return;
        const style = (totalPageNum === pageNum) ? buttonSelectedStyle : {};
        return (
            <ButtonBase
                style={style}
                aria-label={`Page ${totalPageNum}`}
                className={css('numButton')}
                onClick={changePage(totalPageNum)}
            >
                {totalPageNum}
            </ButtonBase>
        );
    };

    return (
        <div className={css('root')}>
            <div className={css('leftContainer')}>
                <span className={css('pageDisplay')}>Page: {pageNum}</span>
                <ButtonBase
                    aria-label="Previous Page"
                    disabled={pageNum <= 1}
                    className={css('arrowButton', (pageNum <= 1) && 'disabled')}
                    onClick={changePage(pageNum - 1)}
                >
                    <ArrowLeft
                        className={css('arrowIcon')}
                        color="secondary"
                    />
                </ButtonBase>

                {renderNumButtons()}

                {renderMoreButton()}

                {renderLastPageButton()}

                <ButtonBase
                    aria-label="Next Page"
                    disabled={pageNum >= totalPageNum}
                    className={css('arrowButton', (pageNum >= totalPageNum) && 'disabled')}
                    onClick={changePage(pageNum + 1)}
                >
                    <ArrowRight
                        className={css('arrowIcon')}
                        color="secondary"
                    />
                </ButtonBase>
            </div>
            <div className={css('rightContainer')}>
                <span
                    className={css('goToPage')}
                >
                    GO TO PAGE:
                    <InputBase
                        value={inputVal}
                        className={css('input')}
                        onChange={handleInputChange}
                        onKeyDown={handleInputSubmit}
                        inputProps={{
                            'data-testid': 'page-input',
                        }}
                    />
                    {(inputVal && inputVal !== pageNum && inputVal <= totalPageNum) && (
                        <IconButton
                            size="small"
                            aria-label="Change Page"
                            disableRipple
                            disableFocusRipple
                            className={css('enterButton', classes.button)}
                            onClick={changePage((inputVal || pageNum))}
                        >
                            <CheckCircle
                                fontSize="inherit"
                                color="primary"
                            />
                        </IconButton>
                    )}
                </span>
            </div>
        </div>
    );
};

export default PaginationControls;
