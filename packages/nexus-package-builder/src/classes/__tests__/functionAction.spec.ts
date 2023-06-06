import { FunctionAction } from '../functionAction';

test('Should initialize all members', () => {
  const script = new FunctionAction({});

  expect(script).toMatchObject({
    action: 'function',
    fn: '',
  });
});

test('Should overwrite the script property if given', () => {
  const partialFunction = { fn: 'fn' };

  const fun = new FunctionAction(partialFunction);

  expect(fun).toMatchObject({
    fn: 'fn',
  });
});
