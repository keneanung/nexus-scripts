import { EventBus } from "../EventBus";

test('Allow to raise an event with the given argument', async () => {
  const bus = new EventBus();
  let givenArgument;
  bus.subscribe('TestEvent', async (arg: string) => {
    givenArgument = arg;
  })

  await bus.raise('TestEvent', 'foo');

  expect(givenArgument).toBe('foo');
});

test('Allow to raise events without subscribers', async () => {
  const bus = new EventBus();

  await bus.raise('TestEvent', 'foo');
})

test('Allow to subscribe to all events', async () => {
  const bus = new EventBus();
  const callback = jest.fn();
  bus.subscribe('*', callback);

  await bus.raise('TestEvent1', 'foo');
  await bus.raise('TetsEvent2', 'bar');

  expect(callback).toBeCalledTimes(2);
});

test('Allow all callbacks to run on error', async () => {
  const bus = new EventBus();
  bus.subscribe('TestEvent', () => { throw new Error('foo') });
  const callback = jest.fn();
  bus.subscribe('TestEvent', callback);
  const originalError = console.error;
  // replace the error function to avoid having something on STDERR
  console.error = () => { };

  await bus.raise('TestEvent', undefined);

  console.error = originalError;
  expect(callback).toBeCalledTimes(1);
});

test('Allow to unsubscribe from events', async () => {
  const bus = new EventBus();
  const callback = jest.fn();

  bus.subscribe('TestEvent', callback)
  await bus.raise('TestEvent', undefined);
  bus.unsubscribe('TestEvent', callback);
  await bus.raise('TestEvent', undefined);

  expect(callback).toBeCalledTimes(1);
});

test('Allow to unsubscribe from events we never subscribed to', async () => {
  const bus = new EventBus();

  bus.unsubscribe('TestEvent', async () => { })
})

test('Allow to unsubscribe from events we never subscribed to, but which has other subscritions', async () => {
  const bus = new EventBus();

  bus.subscribe('TestEvent', async () => { console.log('hey') });
  bus.unsubscribe('TestEvent', async () => { })
})

test('Allow to unsubscribe from all events', async () => {
  const bus = new EventBus();
  const callback = jest.fn();

  bus.subscribe('*', callback)
  await bus.raise('TestEvent', undefined);
  bus.unsubscribe('*', callback);
  await bus.raise('TestEvent', undefined);

  expect(callback).toBeCalledTimes(1);
})