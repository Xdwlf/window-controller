import React from 'react';
import Drawer from '@components/Drawer';

export const AuthenticatedApp = (): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            You&apos;re a wizard Joey.
        </div>
    );
};

export default AuthenticatedApp;
