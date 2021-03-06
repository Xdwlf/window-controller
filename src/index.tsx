import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '@context/ThemeContext';
import App from './App';

const root = document.getElementById('app-container');


const Container = (): JSX.Element => (
    <ThemeProvider>
        <App />
    </ThemeProvider>
);

ReactDOM.render(<Container />, root);
