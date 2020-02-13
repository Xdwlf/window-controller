import React from 'react';
import LoadingComponent from './LoadingComponent';

const loading = (props: LoadableExport.LoadingComponentProps): JSX.Element => {
    const deploymentErrorRegex = /^loading chunk..* failed./i;
    if (props.error && deploymentErrorRegex.test(props.error.message)) {
        return (
            <div>
                Deployment Error
            </div>
        );
    }
    return (
        <LoadingComponent />
    );
};

const loadableConfig = { delay: 500, loading };

export default loadableConfig;
