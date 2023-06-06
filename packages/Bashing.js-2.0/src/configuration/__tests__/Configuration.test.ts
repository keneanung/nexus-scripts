import { Configuration } from '../Configuration';

test('Constructor should work without argument for first initialisation', () => {
  const configuration = new Configuration();
  expect(configuration).toBeDefined();
});

test('Constructor should accept an empty object', () => {
  const config = new Configuration({});

  expect(config).toBeDefined();
});

test('Constructor should instantiate the priorities on empty object', () => {
  const config = new Configuration({});
  expect(config.Priorities).toBeDefined();
});

test('Constructor should create appropriate priorities', () => {
  const config = new Configuration({
    priorities: {
      area1: ['a', 'b', 'c'],
      area2: ['d', 'e', 'f'],
    },
  });
  expect(config.Priorities.AsDictionary()).toEqual({
    area1: ['a', 'b', 'c'],
    area2: ['d', 'e', 'f'],
  });
});

test('AsPrimitive should return a primitve form of the configuration', () => {
  const config = new Configuration({
    priorities: {
      area1: ['a', 'b', 'c'],
      area2: ['d', 'e', 'f'],
    },
  });
  expect(config.AsPrimitive()).toEqual({
    priorities: {
      area1: ['a', 'b', 'c'],
      area2: ['d', 'e', 'f'],
    },
  });
});
