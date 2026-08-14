import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { createPackage } from '../packages/nexus-package-builder/src/createPackage';
import { splitPackage } from '../packages/nexus-package-splitter/src/splitPackage';

const removeGeneratedIds = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(removeGeneratedIds);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== 'id')
        .map(([key, childValue]) => [key, removeGeneratedIds(childValue)]),
    );
  }
  return value;
};

const normalizePackage = (value: unknown): unknown => {
  const packageWithoutIds = removeGeneratedIds(value) as Record<string, unknown>;
  return {
    version: '',
    dependencies: [],
    website: '',
    ...packageWithoutIds,
  };
};

test('Should rebuild an equivalent Nexus package after splitting EventBus.nxs', () => {
  const workingDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'nexus-package-roundtrip-'));
  const splitDirectory = path.resolve(workingDirectory, 'split');
  const rebuiltDirectory = path.resolve(workingDirectory, 'rebuilt');
  const inputPackage = path.resolve(__dirname, '../packages/nexus-event-bus/dist/EventBus.nxs');
  const packageDefinition = path.resolve(splitDirectory, 'EventBus.yaml');
  const rebuiltPackage = path.resolve(rebuiltDirectory, 'EventBus.nxs');
  const mockedConsole = jest.spyOn(global.console, 'log').mockImplementation(() => undefined);

  try {
    expect(splitPackage(inputPackage, splitDirectory)).toBeTruthy();
    expect(createPackage(packageDefinition, rebuiltDirectory)).toBeTruthy();

    const original = JSON.parse(fs.readFileSync(inputPackage, 'utf-8')) as unknown;
    const rebuilt = JSON.parse(fs.readFileSync(rebuiltPackage, 'utf-8')) as unknown;
    expect(normalizePackage(rebuilt)).toEqual(normalizePackage(original));
  } finally {
    mockedConsole.mockRestore();
    fs.rmSync(workingDirectory, { recursive: true, force: true });
  }
});
