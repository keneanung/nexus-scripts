import { DisablemeAction } from '../disablemeAction';

test('Should initialize all members', () => {
  const disablemeAction = new DisablemeAction();

  expect(disablemeAction).toMatchObject({
    action: 'disableme',
  });
});
