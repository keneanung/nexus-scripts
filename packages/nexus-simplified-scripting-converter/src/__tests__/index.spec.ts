import { Action, Package } from '@keneanung/iron-realms-nexus-typings';
import { convertActions, convertPackage } from '..';

test('Should be able to handle empty packages', () => {
  const pkg: Package = {
    name: 'TestPackage',
    enabled: true,
    description: '',
    items: [],
    type: 'group',
    id: 1,
  };

  convertPackage(pkg);

  expect(pkg).toMatchSnapshot();
});

test('Should be able to handle groups', () => {
  const pkg: Package = {
    name: 'TestPackage',
    enabled: true,
    description: '',
    items: [
      {
        id: 2,
        name: 'group',
        type: 'group',
        items: [],
        enabled: true,
      },
    ],
    type: 'group',
    id: 1,
  };

  convertPackage(pkg);

  expect(pkg).toMatchSnapshot();
});

test('Should be able to convert script actions', () => {
  const actions: Action[] = [
    {
      action: 'script',
      script: "console.log('foo')",
    },
  ];

  const result = convertActions(actions);

  expect(result).toMatchSnapshot();
});

test('Should be able to convert function actions', () => {
  const actions: Action[] = [
    {
      action: 'function',
      fn: 'foo',
    },
  ];

  const result = convertActions(actions);

  expect(result).toMatchSnapshot();
});

test('Should not convert function actions with empty function name', () => {
  const actions: Action[] = [
    {
      action: 'function',
      fn: '',
    },
  ];

  const result = convertActions(actions);

  expect(result).toMatchSnapshot();
});
