import { GagAction } from '../gagAction';

test('Should initialize all members', () => {
  const gagAction = new GagAction();

  expect(gagAction).toMatchObject({
    action: 'gag',
  });
});
