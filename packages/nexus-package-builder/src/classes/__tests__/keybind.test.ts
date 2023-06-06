import { IdGenerator } from '../../utils';
import { Keybind } from '../keybind';
import * as utils from '../../utils';

test('Should initialize all members', () => {
  const keybind = new Keybind({}, new IdGenerator(), '');

  expect(keybind).toMatchObject({
    id: 1,
    name: '',
    type: 'keybind',
    enabled: true,
    key: 0,
    key_ctrl: false,
    key_shift: false,
    key_alt: false,
    actions: [],
  });
});

test('Should overwrite the name property if given', () => {
  const partialKeybind = { name: 'keybindName' };

  const keybind = new Keybind(partialKeybind, new IdGenerator(), '');

  expect(keybind).toMatchObject({
    name: 'keybindName',
  });
});

test('Should overwrite the enabled property if given', () => {
  const partialKeybind = { enabled: false };

  const keybind = new Keybind(partialKeybind, new IdGenerator(), '');

  expect(keybind).toMatchObject({
    enabled: false,
  });
});

test('Should keep the id property if given', () => {
  const partialKeybind = { id: 255 };

  const keybind = new Keybind(partialKeybind, new IdGenerator(), '');

  expect(keybind).toMatchObject({
    id: 1,
  });
});

test('Should overwrite the key property if given', () => {
  const partialKeybind = { key: 15 };

  const keybind = new Keybind(partialKeybind, new IdGenerator(), '');

  expect(keybind).toMatchObject({
    key: 15,
  });
});

test('Should overwrite the key_shift property if given', () => {
  const partialKeybind = { key_shift: true };

  const keybind = new Keybind(partialKeybind, new IdGenerator(), '');

  expect(keybind).toMatchObject({
    key_shift: true,
  });
});

test('Should overwrite the key_ctrl property if given', () => {
  const partialKeybind = { key_ctrl: true };

  const keybind = new Keybind(partialKeybind, new IdGenerator(), '');

  expect(keybind).toMatchObject({
    key_ctrl: true,
  });
});

test('Should overwrite the key_alt property if given', () => {
  const partialKeybind = { key_alt: true };

  const keybind = new Keybind(partialKeybind, new IdGenerator(), '');

  expect(keybind).toMatchObject({
    key_alt: true,
  });
});

test('Should add a reflex to items if given', () => {
  const mockedConvertFunction = jest.spyOn(utils, 'convertNexusActionArray');
  const partialKeybind = { actions: [] };

  new Keybind(partialKeybind, new IdGenerator(), '');

  expect(mockedConvertFunction).toHaveBeenCalledTimes(1);
  jest.restoreAllMocks();
});
