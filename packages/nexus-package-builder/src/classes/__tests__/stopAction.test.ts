import { StopAction } from '../stopAction';

test('Should initialize all members', () => {
  const stop = new StopAction();

  expect(stop).toMatchObject({
    action: 'stop',
  });
});
