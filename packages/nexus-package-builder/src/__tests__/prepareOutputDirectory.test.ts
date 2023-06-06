import { prepareOutputDirectory } from '../functionsInteractingWithFileSystem';
import { mocked } from 'jest-mock';
import * as fs from 'fs';

jest.mock('fs');
const mockedFs = mocked(fs);

beforeEach(() => {
  mockedFs.existsSync.mockClear();
  mockedFs.existsSync.mockReturnValue(true);
  mockedFs.statSync.mockClear();
  const stats = new fs.Stats();
  stats.isFile = () => false;
  mockedFs.statSync.mockReturnValue(stats);
});

test('Should create output directory if it does not yet exist', () => {
  mockedFs.existsSync.mockClear();
  mockedFs.existsSync.mockReturnValue(false);

  prepareOutputDirectory('./output/');

  expect(mockedFs.mkdirSync).toHaveBeenCalled();
});

test('Should return readable error message if output path is a file', () => {
  mockedFs.statSync.mockClear();
  const stats = new fs.Stats();
  stats.isFile = () => true;
  mockedFs.statSync.mockReturnValue(stats);

  const { errorMessage } = prepareOutputDirectory('./src/__tests__/testFiles/minimalExample.yaml');

  expect(errorMessage).toMatch(new RegExp('^Output directory .+ is a file\\.$'));
});

test('Should return false if output path is a file', () => {
  mockedFs.statSync.mockClear();
  const stats = new fs.Stats();
  stats.isFile = () => true;
  mockedFs.statSync.mockReturnValue(stats);

  const { result } = prepareOutputDirectory('./src/__tests__/testFiles/minimalExample.yaml');

  expect(result).toBeFalsy();
});

test('Should run fine if output directory exists', () => {
  const { result } = prepareOutputDirectory('./output/');

  expect(result).toBeTruthy();
});
