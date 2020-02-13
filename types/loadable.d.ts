import Loadable from 'react-loadable';

declare module 'react-loadable' {

    interface LoadableComponent {

        preload(): Promise<any>;

    }
}
