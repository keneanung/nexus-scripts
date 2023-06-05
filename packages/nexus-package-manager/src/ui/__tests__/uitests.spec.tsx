import { PackageManager } from '../../lib/PackageManager';
import { PackageManagerUi } from '../PackageManagerUi';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { isNexusPackageInstalled, getPackageList } from '../../lib/nexusPackageInterface';
import { getNexusIconInfo } from '../getNexusIconInfo';
jest.mock('../../lib/nexusPackageInterface');
const isNexusPackageInstalledMock = jest.mocked(isNexusPackageInstalled);
const getPackageListMock = jest.mocked(getPackageList);
getPackageListMock.mockReturnValue([]);

jest.mock('../getNexusIconInfo');
const getNexusIconInfoMock = jest.mocked(getNexusIconInfo);
getNexusIconInfoMock.mockImplementation(() => {
  return {
    width: 512,
    height: 640,
    svgPath: 'this is an svg path',
  };
});
const server = setupServer(
  rest.get('https://keneanung.github.io/nexus-package-repository/repository.json', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          dependencies: [],
          description: 'foo',
          name: 'bar',
          packageName: 'barPackage',
          url: 'https://mykg.com/bar.json',
          website: 'https://mypkg.com',
        },
      ]),
    );
  }),
  rest.get('https://mykg.com/bar.json', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
);

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
  isNexusPackageInstalledMock.mockReset();
});

// Don't forget to clean up afterwards.
afterAll(() => server.close());

test('Should have an empty table without package data', () => {
  const packageManager = new PackageManager();

  const { container } = render(<PackageManagerUi packageManager={packageManager} />);

  expect(container).toMatchSnapshot();
});

test('Should have a table with single package data to install if one package was provided and not installed', async () => {
  isNexusPackageInstalledMock.mockReturnValue(false);
  const packageManager = new PackageManager();
  const { container } = render(<PackageManagerUi packageManager={packageManager} />);

  fireEvent.click(screen.getByText('Update package listing'));
  await waitFor(() => expect(screen.queryAllByRole('row')).toHaveLength(2));

  expect(container).toMatchSnapshot();
});

test('Should have a table with single package data to update if one package was provided and installed', async () => {
  isNexusPackageInstalledMock.mockReturnValue(true);
  const packageManager = new PackageManager();
  const { container } = render(<PackageManagerUi packageManager={packageManager} />);

  fireEvent.click(screen.getByText('Update package listing'));
  await waitFor(() => expect(screen.queryAllByRole('row')).toHaveLength(2));

  expect(container).toMatchSnapshot();
});

test('Should have a table with single package data to update if one package was provided and installed after clicking the button', async () => {
  isNexusPackageInstalledMock.mockReturnValue(false);
  const packageManager = new PackageManager();
  const { container } = render(<PackageManagerUi packageManager={packageManager} />);

  fireEvent.click(screen.getByText('Update package listing'));
  await waitFor(() => expect(screen.queryAllByRole('row')).toHaveLength(2));
  fireEvent.click(screen.getByTestId('barPackage-install'));
  await waitFor(() => expect(screen.getByTestId('barPackage-uninstall')).toBeDefined());

  expect(container).toMatchSnapshot();
});

test('Should have a table with single package data to install if one package was provided and uninstalled after clicking the button', async () => {
  isNexusPackageInstalledMock.mockReturnValue(true);
  const packageManager = new PackageManager();
  const { container } = render(<PackageManagerUi packageManager={packageManager} />);

  fireEvent.click(screen.getByText('Update package listing'));
  await waitFor(() => expect(screen.queryAllByRole('row')).toHaveLength(2));
  fireEvent.click(screen.getByTestId('barPackage-uninstall'));
  await waitFor(() => expect(screen.getByTestId('barPackage-install')).toBeDefined());

  expect(container).toMatchSnapshot();
});

test('Should switch to details view of package after clicking the button', async () => {
  const packageManager = new PackageManager();
  const { container } = render(<PackageManagerUi packageManager={packageManager} />);
  server.use(
    rest.get('https://keneanung.github.io/nexus-package-repository/repository.json', (_, result, context) => {
      return result.once(
        context.json([
          {
            dependencies: ['dependency'],
            description: 'foo',
            name: 'bar',
            packageName: 'barPackage',
            url: 'https://mykg.com/bar.json',
            website: 'https://mypkg.com',
          },
        ]),
      );
    }),
  );

  fireEvent.click(screen.getByText('Update package listing'));
  await waitFor(() => expect(screen.queryAllByRole('row')).toHaveLength(2));
  fireEvent.click(screen.getByTestId('barPackage-details'));
  await waitFor(() => expect(screen.getByText('bar', { selector: 'h1' })).toBeDefined());

  expect(container).toMatchSnapshot();
});

test('Should switch to details view of dependency package after clicking the dependency in detail view', async () => {
  const packageManager = new PackageManager();
  const { container } = render(<PackageManagerUi packageManager={packageManager} />);
  server.use(
    rest.get('https://keneanung.github.io/nexus-package-repository/repository.json', (_, result, context) => {
      return result.once(
        context.json([
          {
            dependencies: [],
            description: 'This is the dependency',
            name: 'dependency',
            packageName: 'dependency',
            url: 'https://mypkg.com/dependency.json',
          },
          {
            dependencies: ['dependency'],
            description: 'foo',
            name: 'bar',
            packageName: 'barPackage',
            url: 'https://mykg.com/bar.json',
          },
        ]),
      );
    }),
  );

  fireEvent.click(screen.getByText('Update package listing'));
  await waitFor(() => expect(screen.queryAllByRole('row')).toHaveLength(3));
  fireEvent.click(screen.getByTestId('barPackage-details'));
  await waitFor(() => expect(screen.getByText('bar', { selector: 'h1' })).toBeDefined());
  fireEvent.click(screen.getByText('dependency'));
  await waitFor(() => expect(screen.getByText('dependency', { selector: 'h1' })).toBeDefined());

  expect(container).toMatchSnapshot();
});

test('Should switch to details view of package after clicking the button and return to overview on click on back', async () => {
  const packageManager = new PackageManager();
  const { container } = render(<PackageManagerUi packageManager={packageManager} />);

  fireEvent.click(screen.getByText('Update package listing'));
  await waitFor(() => expect(screen.queryAllByRole('row')).toHaveLength(2));
  fireEvent.click(screen.getByTestId('barPackage-details'));
  await waitFor(() => expect(screen.getByText('bar', { selector: 'h1' })).toBeDefined());
  fireEvent.click(screen.getByText('Return to package listing'));
  await waitFor(() => expect(screen.queryAllByRole('row')).toHaveLength(2));

  expect(container).toMatchSnapshot();
});
