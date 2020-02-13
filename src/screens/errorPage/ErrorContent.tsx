import React from 'react';
import { cssBind } from '@toolkit/helperUtils';
import Typography from '@components/Typography';
import Button from '@material-ui/core/Button';
import OopsIcon from '@assets/icons/OopsIcon.svg';

import styles from './ErrorContent.less';

const css = cssBind(styles);

type Props = {
    error?: string;
    handleClick: () => void;
}

const ErrorContent = (props: Props): JSX.Element => (
    <div id="ErrorPage" className={css('container')}>
        <div className={css('errorNotice')}>
            <div>{/* This div is not arbitrary - it's so that everything below remains left aligned */}
                <Typography tag="div" color="secondary" bold className={css('errorStatus')}>{props.error} Error</Typography>
                <div className={css('message')}>
                    <Typography color="gray" bold tag="h3" className={css('grayTitle')}>Oops! Looks like we lost our balance!</Typography>
                    <Typography color="gray" bold tag="h3" className={css('grayTitle')}>Please hang tight while we audit this page.</Typography>
                </div>
                <Typography color="gray">In the meantime, you can return to your dashboard to continue.</Typography>
                <div className={css('buttonContainer')}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={props.handleClick}
                    >
                        RETURN TO DASHBOARD
                    </Button>
                </div>
            </div>
        </div>
        <div className={css('imageContainer')}>
            <img src={OopsIcon} alt="oops icon" />
        </div>
    </div>
);

export default ErrorContent;
