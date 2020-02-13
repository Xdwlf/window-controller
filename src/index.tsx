import React from 'react';
import ReactDOM from 'react-dom';
import ThemeContext from '@context/ThemeContext';
import GenericErrorBoundary from '@components/GenericErrorBoundary';
import FullScreenLoader from '@components/FullScreenLoader';
import history from './WizardHistory';
import App from './App';
import Token from './TokenComponent';

const root = document.getElementById('app-container');

const Container = (): JSX.Element => (
    <ThemeContext>
        <GenericErrorBoundary>
            <FullScreenLoader />
            <Token>
                <App />
            </Token>
        </GenericErrorBoundary>
    </ThemeContext>
);
ReactDOM.render(<Container />, root);
