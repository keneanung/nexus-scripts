import { EventBus } from '../index';

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

  expect(async () => await bus.raise('TestEvent', 'foo')).not.toThrow();
})

test('Allow to subscirbe to all events', async ()=> {
  const bus = new EventBus();
  const callback = jest.fn();
  bus.subscribe('*', callback);

  bus.raise('TestEvent1', 'foo');
  bus.raise('TetsEvent2', 'bar');

  expect(callback).toBeCalledTimes(2);
});