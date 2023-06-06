import { IdGenerator } from '../../utils';
import { NexusFunction } from '../function';
import * as fsFunctions from '../../functionsInteractingWithFileSystem';

test('Should return a valid function object', () => {
  const fun = new NexusFunction({}, new IdGenerator(), '');

  expect(fun).toBeDefined();
});

test('Should initialize all members', () => {
  const fun = new NexusFunction({}, new IdGenerator(), '');

  expect(fun).toMatchObject({
    id: 1,
    name: '',
    type: 'function',
    enabled: true,
    code: '',
  });
});

test('Should overwrite the name property if given', () => {
  const partialFunction = { name: 'functionName' };

  const fun = new NexusFunction(partialFunction, new IdGenerator(), '');

  expect(fun).toMatchObject({
    name: 'functionName',
  });
});

test('Should overwrite the enabled property if given', () => {
  const partialFunction = { enabled: false };

  const fun = new NexusFunction(partialFunction, new IdGenerator(), '');

  expect(fun).toMatchObject({
    enabled: false,
  });
});

test('Should keep the id property if given', () => {
  const partialFunction = { id: 255 };

  const fun = new NexusFunction(partialFunction, new IdGenerator(), '');

  expect(fun).toMatchObject({
    id: 1,
  });
});

test('Should overwrite the code property if given', () => {
  const partialFunction = { code: 'code' };

  const fun = new NexusFunction(partialFunction, new IdGenerator(), '');

  expect(fun).toMatchObject({
    code: 'code',
  });
});

test('Should overwrite the code property if given a codeFile', () => {
  const partialFunction = { codeFile: './code.js' };
  const mockedScriptReader = jest.spyOn(fsFunctions, 'readScriptFileRelativeToDefintion');
  mockedScriptReader.mockReturnValue('This is code from a file');

  const fun = new NexusFunction(partialFunction, new IdGenerator(), '');

  expect(fun).toMatchObject({
    code: 'This is code from a file',
  });
});
