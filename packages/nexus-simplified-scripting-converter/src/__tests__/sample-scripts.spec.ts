import { Package } from '@keneanung/iron-realms-nexus-typings';
import { convertPackage } from '..';
import numpadMovement from './examples/numpad_movement.json';

test('Numpad movement', () => {
  const pkg = numpadMovement as Package;
  convertPackage(pkg);

  expect(pkg).toMatchSnapshot();
});
