// disable eslint for the next line as the type system does not understand our use otherwise
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
declare type EventCallback<T extends any = any> = (argument: T) => Promise<void>;

/**
 * Event broker class. It allows the user to subscribe to events and
 * have given functions called upon the event being raised.
 */
export class EventBus {
    private subscriptions: { [eventName: string]: EventCallback[] } = {};
    private subscriptionsToAll: EventCallback[] = [];

    /**
     * Subscribes a new callback to a given event.
     *
     * @param {string} eventName The name of the event to describe to.
     * @param {EventCallback} callback The callback to run on the given event
     */
    public subscribe<T>(eventName: string, callback: EventCallback<T>): void {
        let eventCallbackList: EventCallback<T>[];
        if (eventName === '*') {
            eventCallbackList = this.subscriptionsToAll;
        } else {
            if (this.subscriptions[eventName] === undefined) {
                this.subscriptions[eventName] = [];
            }
            eventCallbackList = this.subscriptions[eventName];
        }
        this.subscribeToEvent<T>(eventCallbackList, callback);
    }

    private subscribeToEvent<T>(eventCallbackList: EventCallback<T>[], callback: EventCallback<T>) {
        eventCallbackList.push(callback);
    }

    /**
     * Raises an event in the event broker and calls all subscribed callback.
     *
     * @param {string} eventName The name of the event to raise.
     * @param {T} eventArgument Argument to this event.
     * @template T The type of eventArgument.
     */
    public async raise<T>(eventName: string, eventArgument: T) {
        const subscriptions = this.subscriptions[eventName];
        this.runCallbacks<T>(subscriptions, eventArgument);

        this.runCallbacks<T>(this.subscriptionsToAll, eventArgument);
    }

    private runCallbacks<T>(subscriptions: EventCallback<T>[], eventArgument: T) {
        if (subscriptions !== undefined) {
            subscriptions.forEach(async (callback) => {
                try {
                    await callback(eventArgument);
                } catch (e: unknown) {
                    console.error(e)
                }
            });
        }
    }

    /**
     * Removes the subscription of a callback from an event.
     *
     * @param {string} eventName The name of the event to remove the callback from.
     * @param {EventCallback} callback The callback to remove.
     */
    public unsubscribe<T>(eventName: string, callback: EventCallback<T>) {
        let subscriptions: EventCallback<T>[];
        if (eventName === '*') {
            subscriptions = this.subscriptionsToAll;
        } else {
            if (this.subscriptions[eventName] === undefined) {
                return;
            }
            subscriptions = this.subscriptions[eventName];
        }
        this.unsubscribeFromEvent(subscriptions, callback);
    }

    private unsubscribeFromEvent<T>(eventCallbackList: EventCallback<T>[], callback: EventCallback<T>) {
        const index = eventCallbackList.indexOf(callback, 0);
        if (index > -1) {
            eventCallbackList.splice(index, 1);
        }
    }
}