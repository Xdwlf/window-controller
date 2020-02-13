import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const EFileIcon = (props: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 24 24" {...props}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <circle fill="currentColor" cx="12" cy="12" r="10" />
            <text fontFamily="AllumiStd-Bold, Allumi Std" fontSize="16" fontWeight="bold" fill="#FFFFFF">
                <tspan x="8" y="16">e</tspan>
            </text>
            <rect x="0" y="0" width="24" height="24" />
        </g>
    </SvgIcon>
);


export default EFileIcon;
