import React, { ReactChildren, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

type Props = {
    children: ReactNode;
}
const RouterWrapper = (props: Props) => {
    return (
        <BrowserRouter>
            {props.children}
        </BrowserRouter>
    )
}

export default RouterWrapper;