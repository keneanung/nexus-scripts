import { DisableAction } from '../disableAction';

test('Should initialize all members', () => {
  const disableAction = new DisableAction({});

  expect(disableAction).toMatchObject({
    action: 'disable',
    type: 'group',
    name: '',
  });
});

test('Should overwrite the type property if given', () => {
  const partialDisable: Partial<client.DisableAction> = { type: 'trigger' };

  const disable = new DisableAction(partialDisable);

  expect(disable).toMatchObject({
    type: 'trigger',
  });
});

test('Should overwrite the name property if given', () => {
  const partialDisable = { name: 'name' };

  const disable = new DisableAction(partialDisable);

  expect(disable).toMatchObject({
    name: 'name',
  });
});
