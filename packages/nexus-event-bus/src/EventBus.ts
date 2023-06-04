import { v4 as uuidv4 } from 'uuid';

// disable eslint for the next line as the type system does not understand our use otherwise
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
declare type EventCallback<T extends any = any> = (argument: T) => Promise<void>;

type NamedEventCallback = {
  callback: EventCallback;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
type EventCallbackSubscriptions<T extends any = any> = Map<string, EventCallback<T>>;

/**
 * Event bus which allows the user to subscribe to events and
 * have given functions called upon the event being raised.
 */
export interface IEventBus {
  /**
   * Subscribes a new callback to a given event.
   *
   * @param {string} eventName The name of the event to describe to. Use '*' to subscribe to all events.
   * @param {EventCallback} callback The callback to run on the given event
   * @param {string} callbackName Optional name of the callback. If not given, a random name will be generated.
   * @param {boolean} overwrite Optional flag to overwrite an existing callback with the same name.
   */
  subscribe<T>(eventName: string, callback: EventCallback<T>, callbackName?: string, overwrite?: boolean): void;

  /**
   * Raises an event in the event broker and calls all subscribed callback.
   *
   * @param {string} eventName The name of the event to raise.
   * @param {T} eventArgument Argument to this event.
   * @template T The type of eventArgument.
   */
  raise<T>(eventName: string, eventArgument: T): void;

  /**
   * Removes the subscription of a callback from an event.
   *
   * @param {string} eventName The name of the event to remove the callback from.
   * @param {EventCallback | string} callback The callback to remove or its name.
   */
  unsubscribe<T>(eventName: string, callback: EventCallback<T> | string): void;

  /**
   * Returns all the callbacks subscribed to a given event.
   *
   * @param {EventCallback} eventName The name of the event to get all subscribed events for.
   * @returns {NamedEventCallback[]} The list of subscribed callbacks.
   */
  getSubscribers(eventName: string): NamedEventCallback[];
}

// Does NOT create a secure random array, but it's good enough for our use case.
const createRandomHexArray = () => {
  const array = new Uint8Array(16);
  for (let index = 0; index < array.length; index++) {
    array[index] = Math.floor(Math.random() * 0xff);
  }
  return array;
};

/**
 * @inheritdoc
 */
export class EventBus implements IEventBus {
  private subscriptions: Map<string, EventCallbackSubscriptions> = new Map<string, EventCallbackSubscriptions>();
  private subscriptionsToAll: EventCallbackSubscriptions = new Map<string, EventCallback>();

  public subscribe(
    eventName: string,
    callback: EventCallback,
    callbackName: string = uuidv4({ rng: createRandomHexArray }),
    overwrite = false,
  ): void {
    let eventCallbacks: EventCallbackSubscriptions;

    if (eventName === '*') {
      eventCallbacks = this.subscriptionsToAll;
    } else {
      if (this.subscriptions.has(eventName) === false) {
        const subscriptions = new Map<string, EventCallback>();
        this.subscriptions.set(eventName, subscriptions);
        eventCallbacks = subscriptions;
      } else {
        // We already check for existence of the event name in the map, so we are sure it exists.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        eventCallbacks = this.subscriptions.get(eventName)!;
      }
    }
    this.subscribeToEvent(eventCallbacks, callback, eventName, callbackName, overwrite);
  }

  private subscribeToEvent(
    eventCallbacks: EventCallbackSubscriptions,
    callback: EventCallback,
    eventName: string,
    callbackName: string,
    overwrite: boolean,
  ) {
    if (eventCallbacks.has(callbackName) && !overwrite) {
      throw new Error(`Callback "${callbackName}" already exists for event "${eventName}"`);
    }
    eventCallbacks.set(callbackName, callback);
  }

  public async raise<T>(eventName: string, eventArgument: T) {
    const subscriptions = this.subscriptions.get(eventName);

    await this.runCallbacks<T>(subscriptions, eventArgument, eventName);

    await this.runCallbacks<T>(this.subscriptionsToAll, eventArgument, eventName);
  }

  private async runCallbacks<T>(
    subscriptions: EventCallbackSubscriptions | undefined,
    eventArgument: T,
    eventName: string,
  ) {
    if (subscriptions !== undefined) {
      for (const [name, callback] of subscriptions) {
        try {
          await callback(eventArgument);
        } catch (e: unknown) {
          console.error(`Error in callback '${name}' for event '${eventName}'`, e);
        }
      }
    }
  }

  public unsubscribe(eventName: string, callback: EventCallback | string) {
    let subscriptions: EventCallbackSubscriptions;
    if (eventName === '*') {
      subscriptions = this.subscriptionsToAll;
    } else {
      if (this.subscriptions.has(eventName) === false) {
        return;
      }
      // there is an early return above in case the event name does not exist
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      subscriptions = this.subscriptions.get(eventName)!;
    }
    this.unsubscribeFromEvent(subscriptions, callback);
  }

  private unsubscribeFromEvent(eventCallbackList: EventCallbackSubscriptions, callback: EventCallback | string) {
    if (typeof callback === 'string') {
      eventCallbackList.delete(callback);
    } else {
      const keys = eventCallbackList.keys();
      for (const key of keys) {
        if (eventCallbackList.get(key) === callback) {
          eventCallbackList.delete(key);
        }
      }
    }
  }

  public getSubscribers(eventName: string): NamedEventCallback[] {
    const result: NamedEventCallback[] = [];

    const collectSubscribers = (name: string, callback: EventCallback) => {
      result.push({
        callback,
        name,
      });
    };

    if (eventName !== '*') {
      const subscriptions = this.subscriptions.get(eventName);
      if (subscriptions !== undefined) {
        for (const [subscriptionName, callback] of subscriptions) {
          collectSubscribers(subscriptionName, callback);
        }
      }
    }

    for (const [subscriptionName, callback] of this.subscriptionsToAll) {
      collectSubscribers(subscriptionName, callback);
    }

    return result;
  }
}
