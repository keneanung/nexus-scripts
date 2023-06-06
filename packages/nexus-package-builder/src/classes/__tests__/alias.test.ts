import { IdGenerator } from '../../utils';
import { Alias } from '../alias';
import * as utils from '../../utils';
import { PartialAlias } from '../../types';

test('Should initialize all members', () => {
  const group = new Alias({}, new IdGenerator(), '');

  expect(group).toMatchObject({
    id: 1,
    name: '',
    type: 'alias',
    enabled: true,
    matching: 'exact',
    whole_words: true,
    case_sensitive: true,
    prefix_suffix: true,
    text: '',
    actions: [],
  });
});

test('Should overwrite the name property if given', () => {
  const partialAlias = { name: 'aliasName' };

  const group = new Alias(partialAlias, new IdGenerator(), '');

  expect(group).toMatchObject({
    name: 'aliasName',
  });
});

test('Should overwrite the enabled property if given', () => {
  const partialAlias = { enabled: false };

  const alias = new Alias(partialAlias, new IdGenerator(), '');

  expect(alias).toMatchObject({
    enabled: false,
  });
});

test('Should keep the id property if given', () => {
  const partialAlias = { id: 255 };

  const alias = new Alias(partialAlias, new IdGenerator(), '');

  expect(alias).toMatchObject({
    id: 1,
  });
});

test('Should overwrite the matching property if given', () => {
  const partialAlias: PartialAlias = { matching: 'regexp' };

  const alias = new Alias(partialAlias, new IdGenerator(), '');

  expect(alias).toMatchObject({
    matching: 'regexp',
  });
});

test('Should overwrite the whole_words property if given', () => {
  const partialAlias = { whole_words: false };

  const alias = new Alias(partialAlias, new IdGenerator(), '');

  expect(alias).toMatchObject({
    whole_words: false,
  });
});

test('Should overwrite the case_sensitive property if given', () => {
  const partialAlias = { case_sensitive: false };

  const alias = new Alias(partialAlias, new IdGenerator(), '');

  expect(alias).toMatchObject({
    case_sensitive: false,
  });
});

test('Should overwrite the prefix_suffix property if given', () => {
  const partialAlias = { prefix_suffix: false };

  const alias = new Alias(partialAlias, new IdGenerator(), '');

  expect(alias).toMatchObject({
    prefix_suffix: false,
  });
});

test('Should overwrite the text property if given', () => {
  const partialAlias = { text: 'text' };

  const alias = new Alias(partialAlias, new IdGenerator(), '');

  expect(alias).toMatchObject({
    text: 'text',
  });
});

test('Should add an action to items if given', () => {
  const mockedConvertFunction = jest.spyOn(utils, 'convertNexusActionArray');
  const partialAlias = { actions: [] };

  new Alias(partialAlias, new IdGenerator(), '');

  expect(mockedConvertFunction).toHaveBeenCalledTimes(1);
  jest.restoreAllMocks();
});
