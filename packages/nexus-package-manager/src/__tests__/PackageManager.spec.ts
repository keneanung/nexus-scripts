import { PackageManager } from '../index';
import { installNexusPackage, isNexusPackageInstalled, uninstallNexusPackage } from '../lib/nexusPackageInterface';
import { DefaultBodyType, Path, rest } from 'msw';
import { setupServer } from 'msw/node';
jest.mock('../lib/nexusPackageInterface');
const installNexusPackageMock = jest.mocked(installNexusPackage);
const isNexusPackageInstalledMock = jest.mocked(isNexusPackageInstalled);
const uninstallNexusPackageMock = jest.mocked(uninstallNexusPackage);

const server = setupServer();

// Enable request interception.
beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  }),
);

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => {
  server.resetHandlers();
  installNexusPackageMock.mockReset();
  isNexusPackageInstalledMock.mockReset();
  uninstallNexusPackageMock.mockReset();
});

// Don't forget to clean up afterwards.
afterAll(() => server.close());

test('Should request the correct URL', async () => {
  setupRepositoryResponses([]);
  const sut = new PackageManager();

  await sut.updateAsync();

  // if we get here, we got no error
  expect(sut.getRepositoryData()).toHaveLength(0);
});

test('Should parse response correctly', async () => {
  setupRepositoryResponses([
    {
      name: 'Event Bus',
      packageName: 'eventbus',
      description: 'Event Bus similar to the Nexus function system, but available outside of the GUI',
      url: 'https://keneanung.github.io/nexus-event-bus/EventBus.nxs',
      dependencies: [],
    },
  ]);
  const sut = new PackageManager();

  await sut.updateAsync();

  expect(sut.getRepositoryData()).toMatchSnapshot();
});

test('Should update correctly if called consecutely', async () => {
  setupRepositoryResponses(
    [
      {
        name: 'first response',
        packageName: 'first',
        description: 'This is the first response',
        url: 'https://keneanung.github.io/nexus-event-bus/first.nxs',
        dependencies: ['firstFoo'],
      },
    ],
    [
      {
        name: 'second response',
        packageName: 'second',
        description: 'This is the second response',
        url: 'https://keneanung.github.io/nexus-event-bus/second.nxs',
        dependencies: ['secondFoo'],
      },
    ],
  );
  const sut = new PackageManager();

  await sut.updateAsync();
  await sut.updateAsync();

  expect(sut.getRepositoryData()).toMatchSnapshot();
});

test('Should have installed package after call to install', async () => {
  const packageUrl = 'https://keneanung.github.io/nexus-event-bus/foo.nxs';
  setupRepositoryResponses([
    {
      name: 'second response',
      packageName: 'second',
      description: 'This is the second response',
      url: packageUrl,
      dependencies: ['secondFoo'],
    },
  ]);
  setupPackageResponse(packageUrl, { name: 'foo', description: 'bar' });
  const sut = new PackageManager();
  await sut.updateAsync();

  await sut.installAsync('second');

  expect(installNexusPackageMock).toMatchSnapshot();
});

test('Should call callback functions after update', async () => {
  setupRepositoryResponses([
    {
      name: 'second response',
      packageName: 'second',
      description: 'This is the second response',
      url: 'https://keneanung.github.io/nexus-event-bus/foo.nxs',
      dependencies: ['secondFoo'],
    },
  ]);
  const callback = jest.fn();
  const sut = new PackageManager();
  sut.onUpdateFinished(callback);

  await sut.updateAsync();

  expect(callback).toHaveBeenCalledTimes(1);
});

test('Should return true for isInstalled if package is already installed', () => {
  isNexusPackageInstalledMock.mockReturnValue(true);
  const sut = new PackageManager();

  const isInstalled = sut.isInstalled('foo');

  expect(isInstalled).toBe(true);
});

test('Should return false for isInstalled if package is not installed', () => {
  isNexusPackageInstalledMock.mockReturnValue(false);
  const sut = new PackageManager();

  const isInstalled = sut.isInstalled('foo');

  expect(isInstalled).toBe(false);
});

test('Should ask the Nexus client to uninstall a package with a given name on uninstall', () => {
  const sut = new PackageManager();

  sut.uninstall('foo');

  expect(uninstallNexusPackageMock).toHaveBeenCalledWith('foo');
});

test('Should ask the Nexus client to uninstall and then install a new version of a package with a given name on update of package', async () => {
  const packageUrl = 'https://keneanung.github.io/nexus-event-bus/foo.nxs';
  setupRepositoryResponses([
    {
      name: 'second response',
      packageName: 'second',
      description: 'This is the second response',
      url: packageUrl,
      dependencies: ['secondFoo'],
    },
  ]);
  setupPackageResponse(packageUrl, { name: 'foo', description: 'bar' });
  const sut = new PackageManager();
  await sut.updateAsync();

  await sut.updatePackageAsync('second');

  expect(uninstallNexusPackageMock).toHaveBeenCalledWith('second');
  expect(installNexusPackageMock).toMatchSnapshot();
});

test('Should call package operation done callback for install with correct arguments', async () => {
  const callback = jest.fn();
  const packageUrl = 'https://keneanung.github.io/nexus-event-bus/foo.nxs';
  setupRepositoryResponses([
    {
      name: 'second response',
      packageName: 'second',
      description: 'This is the second response',
      url: packageUrl,
      dependencies: ['secondFoo'],
    },
  ]);
  setupPackageResponse(packageUrl, { name: 'foo', description: 'bar' });
  const sut = new PackageManager();
  sut.onPackageOperationDone(callback);
  await sut.updateAsync();

  await sut.installAsync('second');

  expect(callback).toHaveBeenCalledWith('install', 'second');
});

test('Should call package operation done callback for uninstall with correct arguments', () => {
  const callback = jest.fn();
  const sut = new PackageManager();
  sut.onPackageOperationDone(callback);

  sut.uninstall('second');

  expect(callback).toHaveBeenCalledWith('uninstall', 'second');
});

test('Should call package operation done callback for updatePackage with correct arguments', async () => {
  const callback = jest.fn();
  const packageUrl = 'https://keneanung.github.io/nexus-event-bus/foo.nxs';
  setupRepositoryResponses([
    {
      name: 'second response',
      packageName: 'second',
      description: 'This is the second response',
      url: packageUrl,
      dependencies: ['secondFoo'],
    },
  ]);
  setupPackageResponse(packageUrl, { name: 'foo', description: 'bar' });
  const sut = new PackageManager();
  sut.onPackageOperationDone(callback);
  await sut.updateAsync();

  await sut.updatePackageAsync('second');

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('update', 'second');
});

test('Should not throw an error if package was not foudn', async () => {
  setupRepositoryResponses([]);
  const sut = new PackageManager();
  await sut.updateAsync();

  const installationAction = async () => await sut.installAsync('foo');

  await expect(installationAction).rejects.toThrow('Package foo not found');
});

test('Should not throw on error in callback function for update.', async () => {
  // overwrite error function to avoid test erroring
  console.error = jest.fn();
  setupRepositoryResponses([]);
  const callback = jest.fn(() => {
    throw Error();
  });
  const sut = new PackageManager();
  sut.onUpdateFinished(callback);

  await sut.updateAsync();

  expect(callback).toBeCalledTimes(1);
  expect(console.error).toBeCalledTimes(1);
});

test('Should not throw on error in callback function for install.', async () => {
  // overwrite error function to avoid test erroring
  console.error = jest.fn();
  const packageUrl = 'https://keneanung.github.io/nexus-event-bus/foo.nxs';
  setupRepositoryResponses([
    {
      name: 'second response',
      packageName: 'second',
      description: 'This is the second response',
      url: packageUrl,
      dependencies: ['secondFoo'],
    },
  ]);
  setupPackageResponse(packageUrl, { name: 'foo', description: 'bar' });
  const callback = jest.fn(() => {
    throw Error();
  });
  const sut = new PackageManager();
  sut.onPackageOperationDone(callback);
  await sut.updateAsync();

  await sut.installAsync('second');

  expect(callback).toBeCalledTimes(1);
  expect(console.error).toBeCalledTimes(1);
});

function setupRepositoryResponses(...responses: DefaultBodyType[]) {
  for (const response of responses.reverse()) {
    server.use(
      rest.get('https://keneanung.github.io/nexus-package-repository/repository.json', (_, result, context) => {
        return result.once(context.json(response));
      }),
    );
  }
}

function setupPackageResponse(url: Path, response: DefaultBodyType) {
  server.use(
    rest.get(url, (_, result, context) => {
      return result.once(context.json(response));
    }),
  );
}
