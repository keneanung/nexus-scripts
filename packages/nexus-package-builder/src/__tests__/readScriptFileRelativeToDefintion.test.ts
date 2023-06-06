import { readScriptFileRelativeToDefintion } from '../functionsInteractingWithFileSystem';
import { mocked } from 'jest-mock';
import * as fs from 'fs';

jest.mock('fs');
const mockedFs = mocked(fs);

test('Should read the file with the correct absolute path', () => {
  mockedFs.readFileSync.mockReset();

  readScriptFileRelativeToDefintion('./test.js', '/absolute/path/definition.yaml');

  expect(mockedFs.readFileSync).toHaveBeenCalledWith('/absolute/path/test.js', expect.anything());
});

test('Should read the file with encoding to get a string back', () => {
  mockedFs.readFileSync.mockReset();

  readScriptFileRelativeToDefintion('./test.js', '/absolute/path/definition.yaml');

  expect(mockedFs.readFileSync).toHaveBeenCalledWith(expect.anything(), 'utf-8');
});

test('Should return what it read from the file', () => {
  mockedFs.readFileSync.mockReset();
  mockedFs.readFileSync.mockReturnValue('This is the code.');

  const result = readScriptFileRelativeToDefintion('./test.js', '/absolute/path/definition.yaml');

  expect(result).toBe('This is the code.');
  jest.restoreAllMocks();
});
