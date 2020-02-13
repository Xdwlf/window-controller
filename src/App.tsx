import React from 'react';
import { showFullScreenLoader, hideFullScreenLoader } from '@components/FullScreenLoader';
import IdleTimer from '@components/IdleTimer';
import AuthenticatedApp from 'AuthenticatedApp';
import UnauthenticatedApp from 'UnauthenticatedApp';
import '@toolkit/lessToolkit/general.less';


const App = (): JSX.Element => {
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        if (loaded) {
            showFullScreenLoader();
        } else {
            hideFullScreenLoader();
        }
    }, [loaded]);
    return (
        <>
            <IdleTimer />
            <main>
                {loaded ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </main>
        </>
    );
};

export default App;
