import { PackageManager } from '../index';
import { enableFetchMocks } from 'jest-fetch-mock'
import { installNexusPackage } from '../lib/installNexusPackage';
enableFetchMocks()
jest.mock('../lib/installNexusPackage');
const installNexusPackageMock = jest.mocked(installNexusPackage);

beforeEach(() => {
  // cleaning up the mess left behind the previous test
  fetchMock.resetMocks();
  installNexusPackageMock.mockReset();
});

test("Should request the correct URL", async () => {
  fetchMock.mockResponse('[]');
  const sut = new PackageManager();

  await sut.updateAsync();

  expect(fetchMock).toHaveBeenCalledWith('https://keneanung.github.io/nexus-package-repository/repository.json');
});

test('Should parse response correctly', async () => {
  fetchMock.mockResponse('[{"name":"Event Bus","packageName":"eventbus","description":"Event Bus similar to the Nexus function system, but available outside of the GUI","url":"https://keneanung.github.io/nexus-event-bus/EventBus.nxs","dependencies":[]}]')
  const sut = new PackageManager();

  await sut.updateAsync();

  expect(sut.getRepositoryData()).toMatchSnapshot();
});

test('Should update correctly if called consecutely', async () => {
  fetchMock.mockResponses(
    '[{"name":"first response","packageName":"first","description":"This is the first response","url":"https://keneanung.github.io/nexus-event-bus/first.nxs","dependencies":["firstFoo"]}]',
    '[{"name":"second response","packageName":"second","description":"This is the second response","url":"https://keneanung.github.io/nexus-event-bus/second.nxs","dependencies":["secondFoo"]}]'
  );
  const sut = new PackageManager();

  await sut.updateAsync();
  await sut.updateAsync();

  expect(sut.getRepositoryData()).toMatchSnapshot();
});

test('Should have installed package after call to install', async() => {
  fetchMock.mockResponseOnce('[{"name":"second response","packageName":"second","description":"This is the second response","url":"https://keneanung.github.io/nexus-event-bus/foo.nxs","dependencies":["secondFoo"]}]');
  fetchMock.mockResponseOnce('{"name": "foo", "description": "bar"}');
  const sut = new PackageManager();
  await sut.updateAsync();

  await sut.installAsync('second');

  expect(installNexusPackageMock).toMatchSnapshot();
})