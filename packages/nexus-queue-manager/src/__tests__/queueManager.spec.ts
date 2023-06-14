import { QueueManager } from '..';
import { sendCommand } from '../nexusApi';

jest.mock('../nexusApi');
const sendCommandMock = jest.mocked(sendCommand);

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => {
  sendCommandMock.mockReset();
});

test.each([
  ['e'],
  ['b'],
  ['c'],
  ['s'],
  ['p'],
  ['w'],
  ['u'],
  ['t'],
  ['!e'],
  ['!b'],
  ['!c'],
  ['!s'],
  ['!p'],
  ['!w'],
  ['!u'],
  ['!t'],
  ['equilibrium'],
  ['balance'],
  ['class'],
  ['paralysis'],
  ['unbound'],
  ['stun'],
  ['free'],
  ['freestand'],
  ['full'],
  ['frl'],
])('Should translate property %p correctly', (queue: string) => {
  const sut = new QueueManager();

  sut.track('foo', queue);

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should have an empty queue after clear("all")', () => {
  const sut = new QueueManager();
  sut.track('foo', 'full');
  sut.track('bar', 'class');
  sut.track('baz', 's');

  sut.clear('all');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should have remove items in class queue after clear("class")', () => {
  const sut = new QueueManager();
  sut.track('foo', 'full');
  sut.track('bar', 'class');
  sut.track('baz', 's');

  sut.clear('class');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should have remove items in class queue after clear("c")', () => {
  const sut = new QueueManager();
  sut.track('foo', 'full');
  sut.track('bar', 'class');
  sut.track('baz', 's');

  sut.clear('c');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should put prepended items first in queue', () => {
  const sut = new QueueManager();
  sut.track('foo', 'full');
  sut.track('bar', 'class');
  sut.track('baz', 's');

  sut.trackFirst('bamboozle', 'freestand');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should put items at given position in queue with trackAt', () => {
  const sut = new QueueManager();
  sut.track('foo', 'full');
  sut.track('bar', 'class');
  sut.track('baz', 's');

  sut.trackAt(3, 'bamboozle', 'freestand');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should replace items at given position in queue with trackReplace', () => {
  const sut = new QueueManager();
  sut.track('foo', 'full');
  sut.track('bar', 'class');
  sut.track('baz', 's');

  sut.trackReplace(2, 'bamboozle', 'freestand');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should remove items at given position in queue with trackRemove', () => {
  const sut = new QueueManager();
  sut.track('foo', 'full');
  sut.track('bar', 'class');
  sut.track('baz', 's');

  sut.trackRemove(2);

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should remove run command from queue', () => {
  const sut = new QueueManager();
  sut.track('foo', 'full');
  sut.track('bar', 'full');
  sut.track('baz', 'full');
  sut.track('foo', 'free');
  sut.track('boom', 'free');

  sut.run('foo', 'full');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should remove run command from queue with different casing', () => {
  const sut = new QueueManager();
  sut.track('foo', 'full');
  sut.track('bar', 'full');
  sut.track('baz', 'full');
  sut.track('foo', 'free');
  sut.track('boom', 'free');

  sut.run('FOO', 'full');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should remove run command from queue (not first item)', () => {
  const sut = new QueueManager();
  sut.track('foo', 'full');
  sut.track('bar', 'full');
  sut.track('baz', 'full');
  sut.track('foo', 'free');
  sut.track('boom', 'free');

  sut.run('foo', 'free');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Workaround for in-game bug #17807', () => {
  const sut = new QueueManager();
  sut.track('sit', 'full');
  sut.track('stand', 'full');
  sut.track('sit', 'eu');

  sut.run('sit', 'eu');
  sut.run('stand', 'eu');
  sut.run('sit', 'eu');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should queue command to in-game queue when added locally and queue not full', () => {
  const sut = new QueueManager();

  sut.do(
    'stand',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );

  expect(sendCommandMock).toMatchSnapshot();
});

test('Should not attempt to queue command to in-game queue when added locally and queue is full', () => {
  const sut = new QueueManager();
  sut.track('sit', 'full');
  sut.track('sit', 'full');
  sut.track('sit', 'full');
  sut.track('sit', 'full');
  sut.track('sit', 'full');
  sut.track('sit', 'full');

  sut.do(
    'stand',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );

  expect(sendCommandMock).toHaveBeenCalledTimes(0);
});

test('Should recognize own queue item on confirmation in game and mark it accordingly', () => {
  const sut = new QueueManager();

  sut.do(
    'stand',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('stand', 'eb!p!t!w');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should not mark same item multiple times as local', () => {
  const sut = new QueueManager();

  sut.do(
    'stand',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('stand', 'eb!p!t!w');
  sut.track('stand', 'eb!p!t!w');

  expect(sut.getQueue()).toMatchSnapshot();
});

test('Should queue command to in-game queue when added locally and queue is full, but queue ran', () => {
  const sut = new QueueManager();

  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sendCommandMock.mockReset();

  sut.do(
    'waiting',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.run('filling', 'eb!p!t!w');

  expect(sendCommandMock).toMatchSnapshot();
});

test('Should not queue commands that are already being queued', () => {
  const sut = new QueueManager();
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sendCommandMock.mockReset();

  sut.do(
    'queueing',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('between', 'eb!p!t!w');
  sut.run('filling', 'eb!p!t!w');

  expect(sendCommandMock).toMatchSnapshot();
});

test('Should re-attempt to queue things if first attempt was blocked due to queue being full', () => {
  const sut = new QueueManager();
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sut.do(
    'filling',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('filling', 'eb!p!t!w');
  sendCommandMock.mockReset();

  sut.do(
    'blocked',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('between', 'full');
  sut.blocked();
  sut.run('between', 'full');

  expect(sendCommandMock).toMatchSnapshot();
});

test('Should re-queue things after being queued with dor and run', () => {
  const sut = new QueueManager();

  sut.do(
    'stand',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
    true,
  );
  sut.track('stand', 'eb!p!t!w');
  sut.run('stand', 'eb!p!t!w');

  expect(sendCommandMock).toMatchSnapshot();
});

test('Should queue only 1 action that consumes balance at any time', () => {
  const sut = new QueueManager();

  sut.do(
    'stand',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    true,
  );
  sut.do(
    'stand',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    true,
  );

  expect(sendCommandMock).toMatchSnapshot();
});

test('Should queue second action that consumes balance after first one ran', () => {
  const sut = new QueueManager();

  sut.do(
    'first consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    true,
  );
  sut.do(
    'second consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    true,
  );
  sut.track('first consuming', 'be!p!t!w');
  sendCommandMock.mockReset();
  sut.run('first consuming', 'be!p!t!w');

  expect(sendCommandMock).toMatchSnapshot();
});

test('Should queue all non-consuming actions after consuming one ran', () => {
  const sut = new QueueManager();

  sut.do(
    'consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    true,
  );
  sut.do(
    'non-consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.do(
    'non-consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.do(
    'non-consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('consuming', 'be!p!t!w');
  sendCommandMock.mockReset();
  sut.run('consuming', 'be!p!t!w');

  expect(sendCommandMock).toMatchSnapshot();
});

test('Should queue all non-consuming actions and first following consuming after consuming one ran', () => {
  const sut = new QueueManager();

  sut.do(
    'first consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    true,
  );
  sut.do(
    'non-consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.do(
    'non-consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.do(
    'non-consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.do(
    'second consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    true,
  );
  sut.track('first consuming', 'be!p!t!w');
  sendCommandMock.mockReset();
  sut.run('first consuming', 'be!p!t!w');

  expect(sendCommandMock).toMatchSnapshot();
});

test('Should queue non-consuming actions and first following consuming after consuming one ran, but no non-consuming after that', () => {
  const sut = new QueueManager();

  sut.do(
    'first consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    true,
  );
  sut.do(
    'non-consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.do(
    'second consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    true,
  );
  sut.do(
    'non-consuming unsent',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    false,
  );
  sut.track('first consuming', 'be!p!t!w');
  sendCommandMock.mockReset();
  sut.run('first consuming', 'be!p!t!w');

  expect(sendCommandMock).toMatchSnapshot();
});

test('Should assume non-local commands to consume balance', () => {
  const sut = new QueueManager();

  sut.track('external', 'free');
  sut.do(
    'consuming',
    {
      haveBalance: true,
      haveEq: true,
      haveParalysis: false,
      beStunned: false,
      beBound: false,
    },
    true,
  );

  expect(sendCommandMock).toHaveBeenCalledTimes(0);
});
