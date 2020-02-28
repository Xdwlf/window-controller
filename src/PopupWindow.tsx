import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '@context/ThemeContext';
import { Typography } from '@material-ui/core';
import ChildWindow from './screens/ChildWindow';

const root = document.getElementById('app-container');

const Container = (): JSX.Element => (
    <ThemeProvider>
        <Typography
            component="main"
            color="inherit"
        >
            <ChildWindow />
        </Typography>
    </ThemeProvider>
);

ReactDOM.render(<Container />, root);
