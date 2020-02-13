
type Callback = ((s: any) => unknown);

type Subscriber = {
    [s: string]: Callback[];
}

class EventEmitter {
    private subscribers: Subscriber = {};

    public emit = (eventType: string, data?: any): void => {
        if (typeof eventType !== 'string') {
            throw new Error(`emit only takes in a string, you passed in ${eventType}`);
        }
        const subscribers = this.subscribers[eventType];
        if (subscribers !== undefined) {
            subscribers.forEach(cb => {
                if (typeof cb === 'function') {
                    cb(data);
                }
            });
        }
    }

    public subscribe = (event: string[] | string, callback: Callback): void => {
        const tempEvent = Array.isArray(event) ? event : [event];
        for (let i = 0; i < tempEvent.length; i++) {
            const evt = tempEvent[i];
            if (typeof evt !== 'string') {
                throw new Error(`Subscribe only takes in an array of strings or a single string, you passed in ${event}`);
            }
            if (this.subscribers[evt] === undefined) {
                this.subscribers[evt] = [];
            }
            this.subscribers[evt].push(callback);
        }
    }

    public unSubscribe = (event: string[] | string, callback: Callback): void => {
        const tempEvent = Array.isArray(event) ? event : [event];
        for (let i = 0; i < tempEvent.length; i++) {
            const evt = tempEvent[i];
            if (typeof evt !== 'string') {
                throw new Error(`Subscribe only takes in an array of strings or a single string, you passed in ${event}`);
            }
            if (this.subscribers[evt] === undefined) {
                return;
            }
            const newSubs = this.subscribers[evt].filter(cb => callback !== cb);
            if (newSubs.length === this.subscribers[evt].length) {
                // eslint-disable-next-line
                console.warn(`
                    You called unsubscribe on the event emitter, but nothing was removed. 
                    This will cause a memory leak in your program.
                    This could be due to not passing the same callback in you used to subscribe with.
                `);
            }
            this.subscribers[evt] = newSubs;
        }
    }
}
export default EventEmitter;
