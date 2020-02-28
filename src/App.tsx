import React from 'react';
import AuthenticatedApp from 'AuthenticatedApp';
import UnauthenticatedApp from 'UnauthenticatedApp';
import { Typography } from '@material-ui/core';

const App = (): JSX.Element => {
    const [loaded, setLoaded] = React.useState(true);

    return (
        <>
            <Typography component="main" color="inherit">
                <main>
                    {loaded ? <AuthenticatedApp /> : <UnauthenticatedApp />}
                </main>
            </Typography>
        </>
    );
};

export default App;
