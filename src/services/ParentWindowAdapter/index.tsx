import EventEmitter from '../EventEmitter';

type Error = string | undefined;

type WindowResponse = {
    windowRef: Window | null;
    error: Error;
}

export type ChildMessage<T> = {
    type: string;
    message: T;
}

export type SiblingMessage = {
    windowId: string;
    message: any;
    timestamp: number;
}

type SubscriptionCallback = (data: SiblingMessage) => void


class ParentWindowAdapter {
    private childWindows: Window[] = []

    private siblingChannel = 'siblingChannel'

    private siblingChannelEmitter = new EventEmitter()

    public windowId = `${(Math.floor(Math.random() * 100000)).toString()}`

    private maxChildWindows = 3

    public constructor() {
        window.addEventListener('storage', this.receiveSiblingMessage);
        window.addEventListener('beforeunload', this.closeChildWindows);
    }

    public sendSiblingMessage = (message: any): void => {
        const data: SiblingMessage = {
            windowId: this.windowId,
            message,
            timestamp: Date.now(),
        };
        localStorage.setItem('parentchannel', JSON.stringify(data));
    }

    private receiveSiblingMessage = (event: StorageEvent): void => {
        if (event.key !== 'parentchannel' || !event.newValue) return;
        const data: SiblingMessage = JSON.parse(event.newValue);
        if (data.windowId === this.windowId) return;
        this.siblingChannelEmitter.emit(this.siblingChannel, data);
    }

    public subscribeSiblingMessages = (callback: SubscriptionCallback): void => {
        this.siblingChannelEmitter.subscribe(this.siblingChannel, callback);
    }

    public unSubscribeSiblingMessages = (callback: SubscriptionCallback): void => {
        this.siblingChannelEmitter.unSubscribe(this.siblingChannel, callback);
    }

    private closeChildWindows = () => {
        this.childWindows.map((window) => {
            window.close();
        });
        localStorage.clear();
    }

    public openChildWindow = (url?: string, windowName?: string, windowFeatures?: string): WindowResponse => {
        let error: Error;
        let newChild = null;
        this.childWindows = this.childWindows.filter((window) => !window.closed);
        const strWindowFeatures = 'outerWidth=1000,width=900,innerWidth=900,outerHeight=8=900,height=800, innerHeight=800, scrollbars,status, titlebar=0, centerscreen=yes';

        if (this.childWindows.length >= this.maxChildWindows) {
            return { windowRef: newChild, error: 'Max number of windows reached' };
        }

        newChild = window.open(url, windowName, windowFeatures ?? strWindowFeatures);
        if (newChild) {
            this.childWindows.push(newChild);
        } else {
            error = 'Unable to open window.';
        }
        return {
            windowRef: newChild,
            error,
        };
    }

    public postMessageAll = (message: any, transferable?: Transferable[]): void => {
        this.childWindows.map((window) => {
            const childMessage = {
                type: 'parentwindow',
                post: message,
                timestamp: Date.now(),
            };
            const origin = 'http://localhost:3000';

            window.postMessage(childMessage, origin, transferable);
        });
    }
}

export default new ParentWindowAdapter();
