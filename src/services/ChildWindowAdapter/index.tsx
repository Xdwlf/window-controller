import EventEmitter from '../EventEmitter';
import { ChildMessage } from '../ParentWindowAdapter';


export type CallbackSubscriptions = (message: ChildMessage<any>) => void


class ChildWindowAdapter {
    private messageEmitter = new EventEmitter()


    public constructor() {
        window.addEventListener('message', this.receiveMessage);
    }

    private receiveMessage = (event: MessageEvent): void => {
        if (event.data.type === 'parentwindow') {
            this.messageEmitter.emit(event.data.post.type, event.data.post.message);
        }
    }

    public subscribe = (type: string, callback: CallbackSubscriptions): void => {
        this.messageEmitter.subscribe(type, callback);
    }

    public unSubscribe = (type: string, callback: CallbackSubscriptions): void => {
        this.messageEmitter.unSubscribe(type, callback);
    }
}

export default new ChildWindowAdapter();
