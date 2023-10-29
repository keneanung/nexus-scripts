import { Package } from '@keneanung/iron-realms-nexus-typings';
import { convertPackage } from '..';
import numpadMovement from './examples/numpad_movement.json';
import timeout from './examples/test_timeout.json';
import waitfor from './examples/test_waitfor.json';
import { v4 } from 'uuid';

jest.mock('uuid');
const mockedV4 = jest.mocked(v4);

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
