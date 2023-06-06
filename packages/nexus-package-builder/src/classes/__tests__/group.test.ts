import { IdGenerator } from '../../utils';
import { Group } from '../group';
import * as utils from '../../utils';

test('Should initialize all members', () => {
  const group = new Group({}, new IdGenerator(), '');

  expect(group).toMatchObject({
    id: 1,
    name: '',
    type: 'group',
    enabled: true,
    items: [],
  });
});

test('Should overwrite the name property if given', () => {
  const partialGroup = { name: 'groupName' };

  const group = new Group(partialGroup, new IdGenerator(), '');

  expect(group).toMatchObject({
    name: 'groupName',
  });
});

test('Should overwrite the enabled property if given', () => {
  const partialGroup = { enabled: false };

  const group = new Group(partialGroup, new IdGenerator(), '');

  expect(group).toMatchObject({
    enabled: false,
  });
});

test('Should keep the id property if given', () => {
  const partialGroup = { id: 255 };

  const group = new Group(partialGroup, new IdGenerator(), '');

  expect(group).toMatchObject({
    id: 1,
  });
});

test('Should add a reflex to items if given', () => {
  const mockedConvertFunction = jest.spyOn(utils, 'convertNexusReflexArray');
  const partialGroup = { items: [] };

  new Group(partialGroup, new IdGenerator(), '');

  expect(mockedConvertFunction).toHaveBeenCalledTimes(1);
  jest.restoreAllMocks();
});
