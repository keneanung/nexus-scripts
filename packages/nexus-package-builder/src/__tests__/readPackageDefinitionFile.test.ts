import { readPackageDefinitionFile } from '../functionsInteractingWithFileSystem';
import { mocked } from 'jest-mock';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

jest.mock('fs');
jest.mock('js-yaml')
const mockedFs = mocked(fs);
const mockedYaml = mocked(yaml);

beforeEach(() => {
  mockedFs.readFileSync.mockReset();
  mockedFs.readFileSync.mockReturnValue('readFileSyncReturnValue');
  mockedYaml.load.mockReset();
  mockedYaml.load.mockReturnValue({});
});

test('Should read the given file', () => {
  readPackageDefinitionFile('/absolute/file/path');

  expect(mockedFs.readFileSync).toHaveBeenCalledWith('/absolute/file/path', expect.anything());
});

test('Should read the file as UTF-8 to force the return of a string (compatibility with js-yaml)', () => {
  readPackageDefinitionFile('/absolute/file/path');

  expect(mockedFs.readFileSync).toHaveBeenCalledWith(expect.anything(), 'utf-8');
});

test('Should hand the string read from the file to js-yaml', () => {
  mockedFs.readFileSync.mockReset();
  mockedFs.readFileSync.mockReturnValue('value read from file');

  readPackageDefinitionFile('/absolute/file/path');

  expect(mockedYaml.load).toHaveBeenCalledWith('value read from file');
});
