import { writePackageDefinition } from '../functionsInteractingWithFileSystem';
import * as fs from 'fs';
import { mocked } from 'jest-mock';

jest.mock('fs');
const mockedFs = mocked(fs);

test('Should write the file content given', () => {
  writePackageDefinition('my content', 'path');

  expect(mockedFs.writeFileSync).toHaveBeenCalledWith(expect.anything(), 'my content');
});

test('Should write the file to a file in the output path with the correct calculated name', () => {
  writePackageDefinition('my content', '/path/testPackage.nxs');

  expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
    expect.stringMatching(new RegExp('/path/testPackage.nxs$')),
    expect.anything(),
  );
});
