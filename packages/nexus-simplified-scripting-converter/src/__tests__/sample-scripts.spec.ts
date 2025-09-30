import { Package } from '@keneanung/iron-realms-nexus-typings';
import { convertPackage } from '..';
import numpadMovement from './examples/numpad_movement.json';
import timeout from './examples/test_timeout.json';
import waitfor from './examples/test_waitfor.json';
import { v4 } from 'uuid';

// mock uuidv4 in a typing compatible way
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));
const mockedV4 = v4 as jest.MockedFunction<() => string>;

test('Numpad movement', () => {
  const pkg = numpadMovement as Package;
  convertPackage(pkg);

  expect(pkg).toMatchSnapshot();
});

test('timeout', () => {
  const pkg = timeout as Package;
  convertPackage(pkg);

  expect(pkg).toMatchSnapshot();
});

test('waitfor', () => {
  const pkg = waitfor as Package;
  mockedV4
    .mockReturnValueOnce('f59a967a-3472-443c-af38-f4709b01915c')
    .mockReturnValueOnce('801a3a41-c5d2-4f39-bf5e-c17d94280a25');

  convertPackage(pkg);

  expect(pkg).toMatchSnapshot();
});
