import { IdGenerator } from '../../utils';
import { Group } from '../group';

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
  const partialGroup = { items: [{ type: 'function' as const, name: 'child-function' }] };

  const group = new Group(partialGroup, new IdGenerator(), '');

  expect(group.items).toMatchObject([{ type: 'function', name: 'child-function' }]);
});
