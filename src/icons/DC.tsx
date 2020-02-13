import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

function DC(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props}>
            <polygon points="12.5 24 22 14.4 7.75 0 3 9.6 7.75 14.4" />
        </SvgIcon>
    );
}
export default DC;
