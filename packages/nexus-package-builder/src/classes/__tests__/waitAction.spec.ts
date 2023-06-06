import { WaitAction } from '../waitAction';

test('Should initialize all members', () => {
  const wait = new WaitAction({});

  expect(wait).toMatchObject({
    action: 'wait',
    seconds: '',
    milliseconds: '',
  });
});

test('Should overwrite the seconds property if given', () => {
  const partialWait = { seconds: 'seconds' };

  const wait = new WaitAction(partialWait);

  expect(wait).toMatchObject({
    seconds: 'seconds',
  });
});

test('Should overwrite the milliseconds property if given', () => {
  const partialWait = { milliseconds: 'milliseconds' };

  const wait = new WaitAction(partialWait);

  expect(wait).toMatchObject({
    milliseconds: 'milliseconds',
  });
});
