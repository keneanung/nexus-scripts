import { RepeatAction } from '../repeatAction';

test('Should initialize all members', () => {
  const repeat = new RepeatAction({});

  expect(repeat).toMatchObject({
    action: 'repeat',
    'cond-type1': 'variable',
    'cond-val1': '',
    'cond-type2': 'variable',
    'cond-val2': '',
    'cond-op': 'eq',
    'cond-mod': '',
    'cond-cs': false,
    label: '',
    mode: 'count',
  });
});

test('Should overwrite the cond-type1 property if given', () => {
  const partialRepeat: Partial<client.RepeatAction> = { 'cond-type1': 'value' };

  const repeat = new RepeatAction(partialRepeat);

  expect(repeat).toMatchObject({
    'cond-type1': 'value',
  });
});

test('Should overwrite the cond-val1 property if given', () => {
  const partialRepeat = { 'cond-val1': 'this is value 1' };

  const repeat = new RepeatAction(partialRepeat);

  expect(repeat).toMatchObject({
    'cond-val1': 'this is value 1',
  });
});

test('Should overwrite the cond-type2 property if given', () => {
  const partialRepeat: Partial<client.RepeatAction> = { 'cond-type2': 'value' };

  const repeat = new RepeatAction(partialRepeat);

  expect(repeat).toMatchObject({
    'cond-type2': 'value',
  });
});

test('Should overwrite the cond-val2 property if given', () => {
  const partialRepeat = { 'cond-val2': 'this is value 2' };

  const repeat = new RepeatAction(partialRepeat);

  expect(repeat).toMatchObject({
    'cond-val2': 'this is value 2',
  });
});

test('Should overwrite the cond-op property if given', () => {
  const partialRepeat: Partial<client.RepeatAction> = { 'cond-op': 'greater' };

  const repeat = new RepeatAction(partialRepeat);

  expect(repeat).toMatchObject({
    'cond-op': 'greater',
  });
});

test('Should overwrite the cond-mod property if given', () => {
  const partialRepeat: Partial<client.RepeatAction> = { 'cond-mod': 'not' };

  const repeat = new RepeatAction(partialRepeat);

  expect(repeat).toMatchObject({
    'cond-mod': 'not',
  });
});

test('Should overwrite the cond-cs property if given', () => {
  const partialRepeat = { 'cond-cs': true };

  const repeat = new RepeatAction(partialRepeat);

  expect(repeat).toMatchObject({
    'cond-cs': true,
  });
});

test('Should overwrite the label property if given', () => {
  const partialRepeat = { label: 'label' };

  const repeat = new RepeatAction(partialRepeat);

  expect(repeat).toMatchObject({
    label: 'label',
  });
});

test('Should overwrite the mode property if given', () => {
  const partialRepeat: Partial<client.RepeatAction> = { mode: 'while' };

  const repeat = new RepeatAction(partialRepeat);

  expect(repeat).toMatchObject({
    mode: 'while',
  });
});
