import * as fs from 'fs';
import * as path from 'path';
import { getCurrentPackageVersion } from '../getCurrentPackageVersion';

test('Should return the package splitter version', () => {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf-8')) as {
    version: string;
  };

  expect(getCurrentPackageVersion()).toBe(packageJson.version);
});
