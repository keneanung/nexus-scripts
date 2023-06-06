import { VariableAction } from '../variableAction';

test('Should initialize all members', () => {
  const variable = new VariableAction({});

  expect(variable).toMatchObject({
    action: 'variable',
    varname: '',
    valtype: 'variable',
    value: '',
    op: 'set',
  });
});

test('Should overwrite the varname property if given', () => {
  const partialVariable = { varname: 'variableName' };

  const variable = new VariableAction(partialVariable);

  expect(variable).toMatchObject({
    varname: 'variableName',
  });
});

test('Should overwrite the valtype property if given', () => {
  const partialVariable: Partial<client.VariableAction> = { valtype: 'value' };

  const variable = new VariableAction(partialVariable);

  expect(variable).toMatchObject({
    valtype: 'value',
  });
});

test('Should overwrite the value property if given', () => {
  const partialVariable = { value: 'this is a value' };

  const variable = new VariableAction(partialVariable);

  expect(variable).toMatchObject({
    value: 'this is a value',
  });
});

test('Should overwrite the op property if given', () => {
  const partialVariable: Partial<client.VariableAction> = { op: 'mul' };

  const variable = new VariableAction(partialVariable);

  expect(variable).toMatchObject({
    op: 'mul',
  });
});
