import { IdGenerator } from '../utils';

test('Should return 1 as first ID', () => {
  const generator = new IdGenerator();

  const id = generator.getId();

  expect(id).toBe(1);
});

test('Should return 2 as second ID', () => {
  const generator = new IdGenerator();

  generator.getId();
  const id = generator.getId();

  expect(id).toBe(2);
});
