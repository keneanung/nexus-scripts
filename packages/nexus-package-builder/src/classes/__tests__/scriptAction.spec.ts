import { ScriptAction } from '../scriptAction';
import * as fsFunctions from '../../functionsInteractingWithFileSystem';

test('Should initialize all members', () => {
  const script = new ScriptAction({}, '');

  expect(script).toMatchObject({
    action: 'script',
    script: '',
  });
});

test('Should overwrite the script property if given', () => {
  const partialScript = { script: 'script' };

  const script = new ScriptAction(partialScript, '');

  expect(script).toMatchObject({
    script: 'script',
  });
});

test('Should overwrite the script property if given a scriptFile', () => {
  const partialScript = { scriptFile: './code.js' };
  const mockedScriptReader = jest.spyOn(fsFunctions, 'readScriptFileRelativeToDefintion');
  mockedScriptReader.mockReturnValue('This is code from a file');

  const fun = new ScriptAction(partialScript, '');

  expect(fun).toMatchObject({
    script: 'This is code from a file',
  });
});
