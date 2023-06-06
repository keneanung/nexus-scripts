import { NexusFunction } from '../classes/function';
import { Group } from '../classes/group';
import { Alias } from '../classes/alias';
import { Trigger } from '../classes/trigger';
import { Event } from '../classes/event';
import { PartialAlias, PartialEvent, PartialFunction, PartialGroup, PartialKeybind, PartialTrigger } from '../types';
import { convertNexusReflexArray, IdGenerator } from '../utils';
import { Keybind } from '../classes/keybind';

test('Should return empty array if given empty array', () => {
  const result = convertNexusReflexArray([], new IdGenerator(), '');

  expect(result.length).toBe(0);
});

test('Should return array with a nexus function if given an array with partial function', () => {
  const input: PartialFunction[] = [{ type: 'function' }];

  const result = convertNexusReflexArray(input, new IdGenerator(), '');

  expect(result).toContainEqual(new NexusFunction({}, new IdGenerator(), ''));
});

test('Should return array with a group if given an array with partial group', () => {
  const input: PartialGroup[] = [{ type: 'group' }];

  const result = convertNexusReflexArray(input, new IdGenerator(), '');

  expect(result).toContainEqual(new Group({}, new IdGenerator(), ''));
});

test('Should return array with an alias if given an array with partial alias', () => {
  const input: PartialAlias[] = [{ type: 'alias' }];

  const result = convertNexusReflexArray(input, new IdGenerator(), '');

  expect(result).toContainEqual(new Alias({}, new IdGenerator(), ''));
});

test('Should return array with a trigger if given an array with partial trigger', () => {
  const input: PartialTrigger[] = [{ type: 'trigger' }];

  const result = convertNexusReflexArray(input, new IdGenerator(), '');

  expect(result).toContainEqual(new Trigger({}, new IdGenerator(), ''));
});

test('Should return array with an event if given an array with partial event', () => {
  const input: PartialEvent[] = [{ type: 'event' }];

  const result = convertNexusReflexArray(input, new IdGenerator(), '');

  expect(result).toContainEqual(new Event({}, new IdGenerator(), ''));
});

test('Should return array with a keybind if given an array with partial keybind', () => {
  const input: PartialKeybind[] = [{ type: 'keybind' }];

  const result = convertNexusReflexArray(input, new IdGenerator(), '');

  expect(result).toContainEqual(new Keybind({}, new IdGenerator(), ''));
});

test('Should throw an error if type property is missing', () => {
  const input: PartialFunction[] = [{ code: 'code' }];

  expect(() => convertNexusReflexArray(input, new IdGenerator(), '')).toThrow(
    'Unrecognized reflex type. Are you missing the "type" property?',
  );
});
