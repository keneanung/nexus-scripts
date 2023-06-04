import { EventBus } from '../EventBus';

test('Allow to raise an event with the given argument', async () => {
  const bus = new EventBus();
  let givenArgument;
  bus.subscribe('TestEvent', async (arg: string) => {
    givenArgument = arg;
  });

  await bus.raise('TestEvent', 'foo');

  expect(givenArgument).toBe('foo');
});

// eslint-disable-next-line jest/expect-expect
test('Allow to raise events without subscribers', async () => {
  const bus = new EventBus();

  await bus.raise('TestEvent', 'foo');
});

test('Allow to subscribe to all events', async () => {
  const bus = new EventBus();
  const callback = jest.fn();
  bus.subscribe('*', callback);

  await bus.raise('TestEvent1', 'foo');
  await bus.raise('TetsEvent2', 'bar');

  expect(callback).toHaveBeenCalledTimes(2);
});

test('Allow all callbacks to run on error', async () => {
  const bus = new EventBus();
  bus.subscribe('TestEvent', () => {
    throw new Error('foo');
  });
  const callback = jest.fn();
  bus.subscribe('TestEvent', callback);
  const mock = jest.spyOn(console, 'error').mockImplementation();

  await bus.raise('TestEvent', undefined);

  mock.mockRestore();
  expect(callback).toHaveBeenCalledTimes(1);
});

test('Allow to unsubscribe from events', async () => {
  const bus = new EventBus();
  const callback = jest.fn();

  bus.subscribe('TestEvent', callback);
  await bus.raise('TestEvent', undefined);
  bus.unsubscribe('TestEvent', callback);
  await bus.raise('TestEvent', undefined);

  expect(callback).toHaveBeenCalledTimes(1);
});

test('Allow to unsubscribe from events we never subscribed to', async () => {
  const bus = new EventBus();

  bus.unsubscribe('TestEvent', jest.fn());

  expect(bus.getSubscribers('TestEvent')).toEqual([]);
});

test('Allow to unsubscribe from events we never subscribed to, but which has other subscritions', async () => {
  const bus = new EventBus();

  bus.subscribe('TestEvent', async () => {
    console.log('hey');
  });

  bus.unsubscribe('TestEvent', jest.fn());

  expect(bus.getSubscribers('TestEvent')).toHaveLength(1);
});

test('Allow to unsubscribe from all events', async () => {
  const bus = new EventBus();
  const callback = jest.fn();

  bus.subscribe('*', callback);
  await bus.raise('TestEvent', undefined);
  bus.unsubscribe('*', callback);
  await bus.raise('TestEvent', undefined);

  expect(callback).toHaveBeenCalledTimes(1);
});

test('Return all registered subscribers to an event', () => {
  const bus = new EventBus();
  const callback = jest.fn();

  bus.subscribe('TestEvent', callback);

  expect(bus.getSubscribers('TestEvent')).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        callback,
      }),
    ]),
  );
});

test('Return all registered subscribers to all events', () => {
  const bus = new EventBus();
  const callback = jest.fn();

  bus.subscribe('*', callback);

  expect(bus.getSubscribers('TestEvent')).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        callback,
      }),
    ]),
  );
});

test('Return all subscribers to an event if multiple callbacks are subscribed', () => {
  const bus = new EventBus();
  const callback1 = jest.fn();
  const callback2 = jest.fn();

  bus.subscribe('TestEvent', callback1);
  bus.subscribe('TestEvent', callback2);

  const subscribers = bus.getSubscribers('TestEvent');

  expect(subscribers).toHaveLength(2);
});

test('Return empty array when no subscribers are registered', () => {
  const bus = new EventBus();

  expect(bus.getSubscribers('TestEvent')).toEqual([]);
});

test('Return subscribers to a given event and subscriber to all events', () => {
  const bus = new EventBus();
  const callback1 = jest.fn();
  const callback2 = jest.fn();

  bus.subscribe('*', callback1);
  bus.subscribe('TestEvent', callback2);

  const subscribers = bus.getSubscribers('TestEvent');
  expect(subscribers).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        callback: callback1,
      }),
    ]),
  );
  expect(subscribers).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        callback: callback2,
      }),
    ]),
  );
});

test('Return subscribers to all events', () => {
  const bus = new EventBus();
  const callback = jest.fn();

  bus.subscribe('*', callback);

  expect(bus.getSubscribers('*')).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        callback,
      }),
    ]),
  );
});

test('Not return subscribers to specialized events if subscribers to all events are requested', () => {
  const bus = new EventBus();
  const callback1 = jest.fn();
  const callback2 = jest.fn();

  bus.subscribe('*', callback1);
  bus.subscribe('TestEvent', callback2);

  expect(bus.getSubscribers('*')).toHaveLength(1);
});

test('Unsubscribe subscriber by name', () => {
  const bus = new EventBus();
  const callback = jest.fn();

  bus.subscribe('*', callback, 'my callback');
  bus.unsubscribe('*', 'my callback');

  expect(bus.getSubscribers('*')).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        callback,
      }),
    ]),
  );
});

test('Disallow multiple subscribers to the same event with the same name', () => {
  const bus = new EventBus();
  const callback = jest.fn();

  bus.subscribe('*', callback, 'my callback');
  expect(() => bus.subscribe('*', callback, 'my callback')).toThrow(
    'Callback "my callback" already exists for event "*"',
  );
});

test('Allow multiple subscribers to the same event with different names', () => {
  const bus = new EventBus();
  const callback = jest.fn();

  bus.subscribe('*', callback, 'my callback');
  bus.subscribe('*', callback, 'my callback 2');

  expect(bus.getSubscribers('*')).toHaveLength(2);
});

test('Overwrite existing subscriber with the same name if enabled', () => {
  const bus = new EventBus();
  const callback = jest.fn();

  bus.subscribe('*', callback, 'my callback');
  bus.subscribe('*', callback, 'my callback', true);

  expect(bus.getSubscribers('*')).toHaveLength(1);
});

test('Output name of callback to console on error', async () => {
  const bus = new EventBus();
  const callback = async () => {
    throw new Error();
  };
  bus.subscribe('*', callback, 'my callback');
  const mock = jest.spyOn(console, 'error').mockImplementation();

  await bus.raise('TestEvent', undefined);

  expect(mock).toHaveBeenCalledWith(expect.stringContaining('my callback'), expect.anything());
  mock.mockRestore();
});

test('Output name of event to console on error', async () => {
  const bus = new EventBus();
  const callback = async () => {
    throw new Error();
  };
  bus.subscribe('*', callback, 'my callback');
  const mock = jest.spyOn(console, 'error').mockImplementation();

  await bus.raise('TestEvent', undefined);

  expect(mock).toHaveBeenCalledWith(expect.stringContaining('TestEvent'), expect.anything());
  mock.mockRestore();
});

test('Output thrown error to console on error', async () => {
  const bus = new EventBus();
  const callback = async () => {
    throw new Error('test error');
  };
  bus.subscribe('*', callback, 'my callback');
  const mock = jest.spyOn(console, 'error').mockImplementation();

  await bus.raise('TestEvent', undefined);

  expect(mock).toHaveBeenCalledWith(expect.any(String), new Error('test error'));
  mock.mockRestore();
});

test('inner functions of non-async callbacks should be called synchronously', async () => {
  const bus = new EventBus();
  const innerFunction = jest.fn();
  const callback = jest.fn(() => {
    innerFunction();
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  bus.subscribe('*', callback);

  await bus.raise('TestEvent', undefined);

  expect(innerFunction).toHaveBeenCalledTimes(1);
});
