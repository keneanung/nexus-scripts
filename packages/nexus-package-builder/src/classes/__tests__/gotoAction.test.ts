import { GotoAction } from '../gotoAction';

test('Should initialize all members', () => {
  const goto = new GotoAction({});

  expect(goto).toMatchObject({
    action: 'goto',
    label: '',
  });
});

test('Should overwrite the label property if given', () => {
  const partialGoto = { label: 'label' };

  const goto = new GotoAction(partialGoto);

  expect(goto).toMatchObject({
    label: 'label',
  });
});
