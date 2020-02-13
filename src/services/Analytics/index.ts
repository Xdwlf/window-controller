import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import history from 'src/WizardHistory';

const reactPlugin = new ReactPlugin();


class Analytics {
    private appInsights: ApplicationInsights;

    private userId: number | undefined;

    private setId = (userId: number): void => {
        this.userId = userId;
    }

    public constructor() {
        this.appInsights = new ApplicationInsights({
            config: {
                instrumentationKey: process.env.INSTRUMENTATION_KEY as string,
                extensions: [reactPlugin],
                extensionConfig: {
                    [reactPlugin.identifier]: { history },
                },
            },
        });
        this.appInsights.loadAppInsights();
        this.appInsights.trackPageView();
    }

    public login = (userId: number): void => {
        this.setId(userId);
        try {
            this.appInsights.setAuthenticatedUserContext(userId.toString());
        } catch (error) {
            this.error(error);
        }
    }

    public trackEvent = (eventName: string, customProperties?: { [key: string]: string }): void => {
        const event = {
            name: eventName,
            properties: {
                userId: this.userId,
                platform: 'web',
                ...customProperties,
            },
        };
        this.appInsights.trackEvent(event);
        // below check used for testing purposes
        if (process.env.BUILD_ENV === 'dev') {
            const log = JSON.stringify({ eventName, ...customProperties });
            // eslint-disable-next-line no-console
            console.log('Analytics Event:', log);
        }
    }

    public error = (exception: Error): void => {
        const params = { exception };
        this.appInsights.trackException(params);
    }

    public logout = (): void => {
        this.trackEvent('CPA-TopHeader', { Value1: 'LogOut' });
        this.appInsights.clearAuthenticatedUserContext();
    }
}

export default new Analytics();
