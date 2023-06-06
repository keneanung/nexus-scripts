import { IfAction } from '../ifAction';

test('Should initialize all members', () => {
  const ifAction = new IfAction({});

  expect(ifAction).toMatchObject({
    action: 'if',
    'cond-type1': 'variable',
    'cond-val1': '',
    'cond-type2': 'variable',
    'cond-val2': '',
    'cond-op': 'eq',
    'cond-mod': '',
    'cond-cs': false,
    dothen: 'continue',
    doelse: 'continue',
    dothenlabel: '',
    doelselabel: '',
  });
});

test('Should overwrite the cond-type1 property if given', () => {
  const partialIf: Partial<client.IfAction> = { 'cond-type1': 'value' };

  const ifAction = new IfAction(partialIf);

  expect(ifAction).toMatchObject({
    'cond-type1': 'value',
  });
});

test('Should overwrite the cond-val1 property if given', () => {
  const partialIf = { 'cond-val1': 'cond-val1' };

  const ifAction = new IfAction(partialIf);

  expect(ifAction).toMatchObject({
    'cond-val1': 'cond-val1',
  });
});

test('Should overwrite the cond-type2 property if given', () => {
  const partialIf: Partial<client.IfAction> = { 'cond-type2': 'value' };

  const ifAction = new IfAction(partialIf);

  expect(ifAction).toMatchObject({
    'cond-type2': 'value',
  });
});

test('Should overwrite the cond-val2 property if given', () => {
  const partialIf = { 'cond-val2': 'cond-val2' };

  const ifAction = new IfAction(partialIf);

  expect(ifAction).toMatchObject({
    'cond-val2': 'cond-val2',
  });
});

test('Should overwrite the cond-op property if given', () => {
  const partialIf: Partial<client.IfAction> = { 'cond-op': 'greater' };

  const ifAction = new IfAction(partialIf);

  expect(ifAction).toMatchObject({
    'cond-op': 'greater',
  });
});

test('Should overwrite the cond-mod property if given', () => {
  const partialIf: Partial<client.IfAction> = { 'cond-mod': 'not' };

  const ifAction = new IfAction(partialIf);

  expect(ifAction).toMatchObject({
    'cond-mod': 'not',
  });
});

test('Should overwrite the cond-cs property if given', () => {
  const partialIf = { 'cond-cs': true };

  const ifAction = new IfAction(partialIf);

  expect(ifAction).toMatchObject({
    'cond-cs': true,
  });
});

test('Should overwrite the dothen property if given', () => {
  const partialIf: Partial<client.IfAction> = { dothen: 'stop' };

  const ifAction = new IfAction(partialIf);

  expect(ifAction).toMatchObject({
    dothen: 'stop',
  });
});

test('Should overwrite the doelse property if given', () => {
  const partialIf: Partial<client.IfAction> = { doelse: 'stop' };

  const ifAction = new IfAction(partialIf);

  expect(ifAction).toMatchObject({
    doelse: 'stop',
  });
});

test('Should overwrite the dothenlabel property if given', () => {
  const partialIf = { dothenlabel: 'dothenlabel' };

  const ifAction = new IfAction(partialIf);

  expect(ifAction).toMatchObject({
    dothenlabel: 'dothenlabel',
  });
});

test('Should overwrite the doelselabel property if given', () => {
  const partialIf = { doelselabel: 'doelselabel' };

  const ifAction = new IfAction(partialIf);

  expect(ifAction).toMatchObject({
    doelselabel: 'doelselabel',
  });
});
