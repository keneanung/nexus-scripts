import { IdGenerator } from '../../utils';
import { Trigger } from '../trigger';
import * as utils from '../../utils';
import { PartialTrigger } from '../../types';

test('Should initialize all members', () => {
  const trigger = new Trigger({}, new IdGenerator(), '');

  expect(trigger).toMatchObject({
    id: 1,
    name: '',
    type: 'trigger',
    enabled: true,
    text: '',
    matching: 'exact',
    whole_words: true,
    case_sensitive: true,
    actions: [],
  });
});

test('Should overwrite the name property if given', () => {
  const partialTrigger = { name: 'triggerName' };

  const trigger = new Trigger(partialTrigger, new IdGenerator(), '');

  expect(trigger).toMatchObject({
    name: 'triggerName',
  });
});

test('Should overwrite the enabled property if given', () => {
  const partialTrigger = { enabled: false };

  const trigger = new Trigger(partialTrigger, new IdGenerator(), '');

  expect(trigger).toMatchObject({
    enabled: false,
  });
});

test('Should overwrite the text property if given', () => {
  const partialTrigger = { text: 'this is some text' };

  const trigger = new Trigger(partialTrigger, new IdGenerator(), '');

  expect(trigger).toMatchObject({
    text: 'this is some text',
  });
});

test('Should overwrite the matching property if given', () => {
  const partialTrigger: PartialTrigger = { matching: 'regexp' };

  const trigger = new Trigger(partialTrigger, new IdGenerator(), '');

  expect(trigger).toMatchObject({
    matching: 'regexp',
  });
});

test('Should overwrite the whole_word property if given', () => {
  const partialTrigger = { whole_words: false };

  const trigger = new Trigger(partialTrigger, new IdGenerator(), '');

  expect(trigger).toMatchObject({
    whole_words: false,
  });
});

test('Should overwrite the case_sensitive property if given', () => {
  const partialTrigger = { case_sensitive: false };

  const trigger = new Trigger(partialTrigger, new IdGenerator(), '');

  expect(trigger).toMatchObject({
    case_sensitive: false,
  });
});

test('Should keep the id property if given', () => {
  const partialTrigger = { id: 255 };

  const trigger = new Trigger(partialTrigger, new IdGenerator(), '');

  expect(trigger).toMatchObject({
    id: 1,
  });
});

test('Should add a action to actions if given', () => {
  const mockedConvertFunction = jest.spyOn(utils, 'convertNexusActionArray');
  const partialTrigger = { actions: [] };

  new Trigger(partialTrigger, new IdGenerator(), '');

  expect(mockedConvertFunction).toHaveBeenCalledTimes(1);
  jest.restoreAllMocks();
});
