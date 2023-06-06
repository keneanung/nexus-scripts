import { LabelAction } from '../labelAction';

test('Should initialize all members', () => {
  const label = new LabelAction({});

  expect(label).toMatchObject({
    action: 'label',
    label: '',
  });
});

test('Should overwrite the label property if given', () => {
  const partialLabel = { label: 'label' };

  const label = new LabelAction(partialLabel);

  expect(label).toMatchObject({
    label: 'label',
  });
});
