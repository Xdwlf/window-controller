import React, { ReactElement } from 'react';
import useQuery from '@hooks/useQuery';
import ApiService from '@services/FetchAdapter';
import { showFullScreenLoader } from '@components/FullScreenLoader';

type TokenProps = { children: ReactElement };

const MINUTES = 18;

const Token = (props: TokenProps): ReactElement | null => {
    const query = useQuery();
    React.useEffect(() => {
        const timer = setInterval(() => {
            // ApiService.call('Cpa_RefreshToken');
        }, 1000 * 60 * MINUTES);
        return (): void => {
            clearInterval(timer);
        };
    }, []);

    React.useEffect(() => {
        if (query.Token) {
            showFullScreenLoader();
            // const args = {
            //     requestBody: {
            //         AppKey: process.env.APP_KEY as string,
            //         TempToken: query.Token,
            //     },
            // };
            // ApiService.call('Cpa_getToken', args).then(resp => {
            //     history.push('/');
            // TODO: ROUTING figure out what to do instead of history
            // });
        } else {
            // ApiService.call('Cpa_RefreshToken');
        }
        // eslint-disable-next-line
    }, []);

    if (query.Token) return null;
    return props.children;
};

export default Token;
