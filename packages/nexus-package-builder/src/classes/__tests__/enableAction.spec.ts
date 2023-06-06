import { EnableAction } from '../enableAction';

test('Should initialize all members', () => {
  const enableAction = new EnableAction({});

  expect(enableAction).toMatchObject({
    action: 'enable',
    type: 'group',
    name: '',
  });
});

test('Should overwrite the type property if given', () => {
  const partialEnable: Partial<client.EnableAction> = { type: 'trigger' };

  const enable = new EnableAction(partialEnable);

  expect(enable).toMatchObject({
    type: 'trigger',
  });
});

test('Should overwrite the name property if given', () => {
  const partialEnable = { name: 'name' };

  const enable = new EnableAction(partialEnable);

  expect(enable).toMatchObject({
    name: 'name',
  });
});
