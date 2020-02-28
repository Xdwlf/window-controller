import React from 'react';
import ParentWindow from './screens/ParentWindow';

export const AuthenticatedApp = (): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <ParentWindow />
        </div>
    );
};

export default AuthenticatedApp;
