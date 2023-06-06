import { ConfigurationService } from '../ConfigurationService';

test('GetConfiguration should return return an empty object after constructong the service', () => {
  const configService = new ConfigurationService();
  expect(configService.getConfiguration()).toEqual({
    priorities: {},
  });
});

test('GetConfiguration should return the configuration after calling setConfiguration', () => {
  const configService = new ConfigurationService();
  configService.setConfiguration({
    priorities: {
      area1: ['a', 'b', 'c'],
      area2: ['d', 'e', 'f'],
    },
  });
  expect(configService.getConfiguration()).toEqual({
    priorities: {
      area1: ['a', 'b', 'c'],
      area2: ['d', 'e', 'f'],
    },
  });
});

test('AddTargetPriority should Append a new thing to the given areas priority', () => {
  const configService = new ConfigurationService();
  configService.setConfiguration({
    priorities: {
      area1: ['a', 'b', 'c'],
      area2: ['d', 'e', 'f'],
    },
  });
  configService.addTargetPriority('area1', 'g');
  expect(configService.getConfiguration()).toEqual({
    priorities: {
      area1: ['a', 'b', 'c', 'g'],
      area2: ['d', 'e', 'f'],
    },
  });
});

test('RemoveTargetPriority should remove the given target from the given area', () => {
  const configService = new ConfigurationService();
  configService.setConfiguration({
    priorities: {
      area1: ['a', 'b', 'c'],
      area2: ['d', 'e', 'f'],
    },
  });
  configService.removeTargetPriority('area1', 'b');
  expect(configService.getConfiguration()).toEqual({
    priorities: {
      area1: ['a', 'c'],
      area2: ['d', 'e', 'f'],
    },
  });
});

test('GetPriority should return the priority of the given target in the given area', () => {
  const configService = new ConfigurationService();
  configService.setConfiguration({
    priorities: {
      area1: ['a', 'b', 'c'],
      area2: ['d', 'e', 'f'],
    },
  });
  expect(configService.getPriority('area1', 'b')).toBe(1);
});

test('GetPriority should return undefined if the given target is not in the given area', () => {
  const configService = new ConfigurationService();
  configService.setConfiguration({
    priorities: {
      area1: ['a', 'b', 'c'],
      area2: ['d', 'e', 'f'],
    },
  });
  expect(configService.getPriority('area1', 'g')).toBeUndefined();
});
