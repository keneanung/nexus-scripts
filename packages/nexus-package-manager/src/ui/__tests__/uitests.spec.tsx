import { PackageManager } from '../../lib/PackageManager';
import { PackageManagerUi } from '../index';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { isNexusPackageInstalled } from '../../lib/nexusPackageInterface';
jest.mock('../../lib/nexusPackageInterface');
const isNexusPackageInstalledMock = jest.mocked(isNexusPackageInstalled);

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
afterEach(() => server.resetHandlers());

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
  fireEvent.click(screen.getByText('Install'));
  await waitFor(() => expect(screen.getByText('Uninstall')).toBeDefined());

  expect(container).toMatchSnapshot();
});

test('Should have a table with single package data to install if one package was provided and uninstalled after clicking the button', async () => {
  isNexusPackageInstalledMock.mockReturnValue(true);
  const packageManager = new PackageManager();
  const { container } = render(<PackageManagerUi packageManager={packageManager} />);

  fireEvent.click(screen.getByText('Update package listing'));
  await waitFor(() => expect(screen.queryAllByRole('row')).toHaveLength(2));
  fireEvent.click(screen.getByText('Uninstall'));
  await waitFor(() => expect(screen.getByText('Install')).toBeDefined());

  expect(container).toMatchSnapshot();
});
