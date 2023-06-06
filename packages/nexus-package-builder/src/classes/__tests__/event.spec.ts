import { IdGenerator } from '../../utils';
import { Event } from '../event';
import * as utils from '../../utils';
import { PartialEvent } from '../../types';

test('Should initialize all members', () => {
  const group = new Event({}, new IdGenerator(), '');

  expect(group).toMatchObject({
    id: 1,
    name: '',
    type: 'event',
    enabled: true,
    evtype: 'GMCP',
    evsubtype: 'Char.Vitals',
    actions: [],
  });
});

test('Should overwrite the name property if given', () => {
  const partialEvent = { name: 'eventName' };

  const event = new Event(partialEvent, new IdGenerator(), '');

  expect(event).toMatchObject({
    name: 'eventName',
  });
});

test('Should overwrite the enabled property if given', () => {
  const partialEvent = { enabled: false };

  const event = new Event(partialEvent, new IdGenerator(), '');

  expect(event).toMatchObject({
    enabled: false,
  });
});

test('Should keep the id property if given', () => {
  const partialEvent = { id: 255 };

  const event = new Event(partialEvent, new IdGenerator(), '');

  expect(event).toMatchObject({
    id: 1,
  });
});

test('Should overwrite the evsubtype property if given', () => {
  const partialEvent: PartialEvent = { evsubtype: 'Room.AddPlayer' };

  const event = new Event(partialEvent, new IdGenerator(), '');

  expect(event).toMatchObject({
    evsubtype: 'Room.AddPlayer',
  });
});

test('Should add a reflex to items if given', () => {
  const mockedConvertFunction = jest.spyOn(utils, 'convertNexusActionArray');
  const partialEvent = { actions: [] };

  new Event(partialEvent, new IdGenerator(), '');

  expect(mockedConvertFunction).toHaveBeenCalledTimes(1);
  jest.restoreAllMocks();
});
