import React from 'react';
import ErrorContent from './ErrorContent';


const ErrorPage = (): JSX.Element => {
    // const location = useLocation();
    // const { error } = location.state;

    // const history = useHistory();
    // TODO: ROUTING figure out what to do instead of history


    const handleClick = () => {
        // history.replace('/dashboard');
        // redirect
    };

    return (
        <ErrorContent
            // error={error.status}
            handleClick={handleClick}
        />
    );
};
export default ErrorPage;
