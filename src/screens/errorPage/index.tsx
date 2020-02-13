import React from 'react';
import { useLocation, useHistory } from 'react-router';
import ErrorContent from './ErrorContent';


const ErrorPage = (): JSX.Element => {
    const location = useLocation();
    const { error } = location.state;

    const history = useHistory();

    const handleClick = () => {
        history.replace('/dashboard');
    };

    return <ErrorContent error={error.status} handleClick={handleClick} />;
};
export default ErrorPage;
