import { readPackageDefinitionFile } from '../functionsInteractingWithFileSystem';
import { mocked } from 'jest-mock';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

jest.mock('fs');
const mockedFs = mocked(fs);
let mockedYamlLoad: jest.SpyInstance<unknown, [str: string, opts?: yaml.LoadOptions]>;

beforeEach(() => {
  mockedFs.readFileSync.mockReset();
  mockedFs.readFileSync.mockReturnValue('readFileSyncReturnValue');
  mockedYamlLoad = jest.spyOn(yaml, 'load');
  mockedYamlLoad.mockReturnValue({});
});

test('Should read the given file', () => {
  readPackageDefinitionFile('/absolute/file/path');

  expect(mockedFs.readFileSync).toHaveBeenCalledWith('/absolute/file/path', expect.anything());
});

test('Should read the file as UTF-8 to force the return of a string (compatibility with js-yaml)', () => {
  readPackageDefinitionFile('/absolute/file/path');

  expect(mockedFs.readFileSync).toHaveBeenCalledWith(expect.anything(), 'utf-8');
});

test('Should return the parsed string', () => {
  mockedFs.readFileSync.mockReset();
  mockedFs.readFileSync.mockReturnValue('type: group\ndescription: foo\nname: my package');
  mockedYamlLoad.mockRestore();

  const result = readPackageDefinitionFile('/absolute/file/path');

  expect(result).toStrictEqual({
    name: 'my package',
    description: 'foo',
    type: 'group',
  });
});

test('Should hand the string read from the file to js-yaml', () => {
  mockedFs.readFileSync.mockReset();
  mockedFs.readFileSync.mockReturnValue('value read from file');

  readPackageDefinitionFile('/absolute/file/path');

  expect(mockedYamlLoad).toHaveBeenCalledWith('value read from file');
});
