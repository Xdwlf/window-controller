import React, { ReactNode } from 'react';
import Analytics from '@services/Analytics';

import ErrorContent from '../../screens/errorPage/ErrorContent';

type ErrorState = {
    hasError: boolean;
}
class GenericErrorBoundary extends React.Component<{}, ErrorState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    public componentDidCatch(error: Error, errorInfo: any): void {
        // You can also log the error to an error reporting service
        this.setState({ hasError: true });
        console.warn(errorInfo); // eslint-disable-line no-console
        Analytics.error(error);
    }

    private handleClick = (): void => {
        this.setState({ hasError: false });
        // history.replace('/dashboard');
        // TODO: ROUTING figure out what to do instead of history
    }

    public render(): ReactNode {
        if (this.state.hasError) {
            // TODO: use page opps error for this...
            return (
                <ErrorContent handleClick={this.handleClick} />
            );
        }

        return this.props.children;
    }
}

export default GenericErrorBoundary;
