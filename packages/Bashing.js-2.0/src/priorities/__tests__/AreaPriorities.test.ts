import { AreaPriorities } from '../AreaPriorities';

test('Should  be able to create an instance of AreaPriorities from an empty dictionary', () => {
  const prios = new AreaPriorities({});

  expect(prios).toBeDefined();
});

test('Should be able to create an instance of AreaPriorities from a dictionary with one area', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'c'],
  });

  expect(prios).toBeDefined();
});

test('Should be able to create an instance of AreaPriorities from a dictionary with multiple areas', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'c'],
    anotherArea: ['d', 'e', 'f'],
  });

  expect(prios).toBeDefined();
});

test('Should return a dictionary of priorities for each area if no priorities are defined', () => {
  const prios = new AreaPriorities({});

  expect(prios.AsDictionary()).toEqual({});
});

test('Should return a dictionary of priorities for each area if priorities are defined', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'c'],
    anotherArea: ['d', 'e', 'f'],
  });

  expect(prios.AsDictionary()).toEqual({
    area: ['a', 'b', 'c'],
    anotherArea: ['d', 'e', 'f'],
  });
});

test('Should change the order of priorities for an individual area', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'c'],
  });

  prios.SetPriorityOrder('area', ['c', 'a', 'b']);

  expect(prios.AsDictionary()).toEqual({
    area: ['c', 'a', 'b'],
  });
});

test('Should disallow to redefine the priorities of an area', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'd'],
  });

  const changeFunc = () => prios.SetPriorityOrder('area', ['a', 'b', 'c']);

  expect(changeFunc).toThrow('Redefinig priorities for an area is not allowed this way');
});

test('Should throw an error for setting the priority order if area does not exist', () => {
  const prios = new AreaPriorities({});

  const changeFunc = () => prios.SetPriorityOrder('area', ['a', 'b', 'c']);

  expect(changeFunc).toThrow("Area 'area' does not exist");
});

test('Should return the priority of a given thing in an area', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'c'],
  });

  expect(prios.GetPriority('area', 'a')).toBe(0);
});

test('Should return undefined if the area does not exist', () => {
  const prios = new AreaPriorities({});

  expect(prios.GetPriority('area', 'a')).toBeUndefined();
});

test('Should return undefined if the thing does not exist', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'c'],
  });

  expect(prios.GetPriority('area', 'd')).toBeUndefined();
});

test('Should allow appending new things to the priority list of an area', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'c'],
  });

  prios.Append('area', 'd');

  expect(prios.AsDictionary()).toEqual({
    area: ['a', 'b', 'c', 'd'],
  });
});

test('Should allow appending new things to new areas', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'c'],
  });

  prios.Append('anotherArea', 'd');

  expect(prios.AsDictionary()).toEqual({
    area: ['a', 'b', 'c'],
    anotherArea: ['d'],
  });
});

test('Should allow removing things from the priority list of an area', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'c'],
  });

  prios.Remove('area', 'b');

  expect(prios.AsDictionary()).toEqual({
    area: ['a', 'c'],
  });
});

test('Should allow removing things from a non-exsting area', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'c'],
  });

  prios.Remove('anotherArea', 'b');

  expect(prios.AsDictionary()).toEqual({
    area: ['a', 'b', 'c'],
  });
});

test('Should allow removing a non-existing thing from an area', () => {
  const prios = new AreaPriorities({
    area: ['a', 'b', 'c'],
  });

  prios.Remove('area', 'd');

  expect(prios.AsDictionary()).toEqual({
    area: ['a', 'b', 'c'],
  });
});
