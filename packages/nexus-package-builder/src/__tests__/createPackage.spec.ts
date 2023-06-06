import { mocked } from 'jest-mock';
import * as fsFunctions from '../functionsInteractingWithFileSystem';
import { createPackage } from '../createPackage';
import * as PackageClass from '../classes/package';

jest.mock('../functionsInteractingWithFileSystem');
const mockedFsFunctions = mocked(fsFunctions);
const mockedConsole = jest.spyOn(global.console, 'log');

const mockedPackageConstructor = jest.spyOn(PackageClass, 'Package');

beforeEach(() => {
  mockedFsFunctions.checkPackageDefinitionFile.mockClear();
  mockedFsFunctions.checkPackageDefinitionFile.mockReturnValue({ result: true });
  mockedFsFunctions.prepareOutputDirectory.mockClear();
  mockedFsFunctions.prepareOutputDirectory.mockReturnValue({ result: true });
  mockedFsFunctions.readPackageDefinitionFile.mockClear();
  mockedFsFunctions.readPackageDefinitionFile.mockReturnValue({});
  mockedFsFunctions.writePackageDefinition.mockClear();
  mockedConsole.mockClear();
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  mockedConsole.mockImplementation(() => {});
  mockedPackageConstructor.mockClear();
});

test('Should return true, if FS functions work', () => {
  const result = createPackage('doesNotMatter.yaml', './doesntEither');

  expect(result).toBeTruthy();
});

test('Should return false, if package definition file was wrong somehow', () => {
  mockedFsFunctions.checkPackageDefinitionFile.mockClear();
  mockedFsFunctions.checkPackageDefinitionFile.mockReturnValue({ result: false, errorMessage: 'Some error' });

  const result = createPackage('doesNotMatter.yaml', './doesntEither');

  expect(result).toBeFalsy();
});

test('Should print error message, if package definition file was wrong somehow', () => {
  mockedFsFunctions.checkPackageDefinitionFile.mockClear();
  mockedFsFunctions.checkPackageDefinitionFile.mockReturnValue({
    result: false,
    errorMessage: 'Some error about def file',
  });

  createPackage('doesNotMatter.yaml', './doesntEither');

  expect(mockedConsole).toHaveBeenCalledWith('Some error about def file');
});

test('Should return false, if output path was wrong somehow', () => {
  mockedFsFunctions.prepareOutputDirectory.mockClear();
  mockedFsFunctions.prepareOutputDirectory.mockReturnValue({ result: false, errorMessage: 'Some error' });

  const result = createPackage('doesNotMatter.yaml', './doesntEither');

  expect(result).toBeFalsy();
});

test('Should print error message, if output path was wrong somehow', () => {
  mockedFsFunctions.prepareOutputDirectory.mockClear();
  mockedFsFunctions.prepareOutputDirectory.mockReturnValue({
    result: false,
    errorMessage: 'Some error about package path',
  });

  createPackage('doesNotMatter.yaml', './doesntEither');

  expect(mockedConsole).toHaveBeenCalledWith('Some error about package path');
});

test('Should get the content of the package defintion file', () => {
  createPackage('doesNotMatter.yaml', './doesntEither');

  expect(mockedFsFunctions.readPackageDefinitionFile).toHaveBeenCalledTimes(1);
});

test('Should write the JSON version of a package definition to disk', () => {
  mockedFsFunctions.readPackageDefinitionFile.mockClear();
  mockedFsFunctions.readPackageDefinitionFile.mockReturnValue({
    items: [],
    name: 'some package',
    description: 'I have a desc too',
  });

  createPackage('doesNotMatter', './output');

  expect(mockedFsFunctions.writePackageDefinition).toHaveBeenCalledWith(
    '{"name":"some package","enabled":true,"description":"I have a desc too","type":"group","items":[],"version":"","dependencies":[],"website":"","id":1}',
    expect.anything(),
  );
});

test('Should contain given version in the output to disk', () => {
  mockedFsFunctions.readPackageDefinitionFile.mockClear();
  mockedFsFunctions.readPackageDefinitionFile.mockReturnValue({
    items: [],
    name: 'some package',
    description: 'I have a desc too',
  });

  createPackage('doesNotMatter', './output', '1.2.3');

  expect(mockedFsFunctions.writePackageDefinition).toHaveBeenCalledWith(
    expect.stringContaining('"version":"1.2.3"'),
    expect.anything(),
  );
});

test('Should tell the write function to correct place to write the package to', () => {
  createPackage('./input.yaml', './packagePath');

  expect(mockedFsFunctions.writePackageDefinition).toHaveBeenCalledWith(
    expect.anything(),
    expect.stringMatching(new RegExp('/packagePath/input.nxs$')),
  );
});

test('Should create a new package with the correct package definition file path', () => {
  createPackage('./input.yaml', './packagePath');

  expect(mockedPackageConstructor).toHaveBeenCalledWith(
    expect.anything(),
    expect.stringMatching(new RegExp('/input.yaml$')),
    undefined,
  );
});
