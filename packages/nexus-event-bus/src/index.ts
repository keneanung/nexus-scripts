// disable eslint for the next line as the type system does not understand our use otherwise
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
declare type EventCallback<T extends any = any> = (argument: T) => Promise<void>;

/**
 * Event broker class. It allows the user to subscribe to events and
 * have given functions called upon the event being raised.
 */
export class EventBus {
    private subscriptions: { [eventName: string]: EventCallback[] } = {};

    /**
     * Subscribes a new callback to a given event.
     *
     * @param {string} eventName The name of the event to describe to.
     * @param {EventCallback} callback The callback to run on the given event
     */
    public subscribe<T>(eventName: string, callback: EventCallback<T>): void {
        if (this.subscriptions[eventName] === undefined) {
            this.subscriptions[eventName] = [];
        }
        this.subscriptions[eventName].push(callback);
    }

    /**
     * Raises an event in the event broker and calls all subscribed callback.
     *
     * @param {string} eventName The name of the event to raise.
     * @param {T} eventArgument Argument to this event.
     * @template T The type of eventArgument.
     */
    public async raise<T>(eventName: string, eventArgument: T) {
        this.subscriptions[eventName].forEach(async callback => {
            await callback(eventArgument);
        });
    }
}