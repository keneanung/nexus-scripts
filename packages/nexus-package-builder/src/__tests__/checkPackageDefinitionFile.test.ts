import { checkPackageDefinitionFile } from '../functionsInteractingWithFileSystem';
import { mocked } from 'jest-mock';
import * as fs from 'fs';

jest.mock('fs');
const mockedFs = mocked(fs);

beforeEach(() => {
  mockedFs.existsSync.mockClear();
  mockedFs.existsSync.mockReturnValue(true);
  mockedFs.statSync.mockClear();
  const stats = new fs.Stats();
  stats.isFile = () => true;
  mockedFs.statSync.mockReturnValue(stats);
});

test('Should accept existing YAML file just fine', () => {
  const { result } = checkPackageDefinitionFile('./src/__tests__/testFiles/minimalExample.yaml');

  expect(result).toBeTruthy();
});

test('Should return an error if input file does not exist', () => {
  mockedFs.existsSync.mockClear();
  mockedFs.existsSync.mockReturnValue(false);

  const { errorMessage } = checkPackageDefinitionFile('./src/__tests__/testFiles/iDontExist.yaml');

  expect(errorMessage).toMatch(new RegExp('^Package definition file .+ does not exist\\.$'));
});

test('Should return false if input file does not exist', () => {
  mockedFs.existsSync.mockClear();
  mockedFs.existsSync.mockReturnValue(false);

  const { result } = checkPackageDefinitionFile('./src/__tests__/testFiles/iDontExist.yaml');

  expect(result).toBeFalsy();
});

test('Should return an error if given path is a directory', () => {
  mockedFs.statSync.mockClear();
  const stats = new fs.Stats();
  stats.isFile = () => false;
  mockedFs.statSync.mockReturnValue(stats);

  const { errorMessage } = checkPackageDefinitionFile('./src/');

  expect(errorMessage).toMatch(new RegExp('^Input path .+ is not a file\\.$'));
});

test('Should return false if given path is a directory', () => {
  mockedFs.statSync.mockClear();
  const stats = new fs.Stats();
  stats.isFile = () => false;
  mockedFs.statSync.mockReturnValue(stats);

  const { result } = checkPackageDefinitionFile('./src/');

  expect(result).toBeFalsy();
});
