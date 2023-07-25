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

test('Should be able to handle aliases', () => {
  const pkg: Package = {
    name: 'TestPackage',
    enabled: true,
    description: '',
    items: [
      {
        type: 'alias',
        id: 2,
        case_sensitive: false,
        enabled: true,
        matching: 'regexp',
        name: 'foo',
        prefix_suffix: false,
        whole_words: true,
        text: '^Hello World$',
        actions: [
          {
            action: 'function',
            fn: 'bar'
          }
        ]
      }
    ],
    type: 'group',
    id: 1,
  };

  convertPackage(pkg);

  expect(pkg).toMatchSnapshot();
});

test('Should be able to handle triggers', () => {
  const pkg: Package = {
    name: 'TestPackage',
    enabled: true,
    description: '',
    items: [
      {
        type: 'trigger',
        id: 2,
        case_sensitive: false,
        enabled: true,
        matching: 'regexp',
        name: 'foo',
        whole_words: true,
        text: '^Hello World$',
        actions: [
          {
            action: 'function',
            fn: 'bar'
          }
        ]
      }
    ],
    type: 'group',
    id: 1,
  };

  convertPackage(pkg);

  expect(pkg).toMatchSnapshot();
});

test('Should be able to handle keybinds', () => {
  const pkg: Package = {
    name: 'TestPackage',
    enabled: true,
    description: '',
    items: [
      {
        type: 'keybind',
        id: 2,
        enabled: true,
        name: 'foo',
        key: 2,
        key_alt: false,
        key_ctrl: false,
        key_shift: false,
        actions: [
          {
            action: 'function',
            fn: 'bar'
          }
        ]
      }
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

test('Should be able to convert disable actions', () => {
  const actions: Action[] = [
    {
      action: 'disable',
      type: 'alias',
      name: 'foo',
    },
  ];

  const result = convertActions(actions);

  expect(result).toMatchSnapshot();
});

test('Should be able to convert enable actions', () => {
  const actions: Action[] = [
    {
      action: 'enable',
      type: 'alias',
      name: 'foo',
    },
  ];

  const result = convertActions(actions);

  expect(result).toMatchSnapshot();
});

test('Should be able to convert command actions', () => {
  const actions: Action[] = [
    {
      action: 'command',
      command: 'foo',
      prefix_suffix: true,
    },
  ];

  const result = convertActions(actions);

  expect(result).toMatchSnapshot();
});

test('Should be able to convert command actions without suffix', () => {
  const actions: Action[] = [
    {
      action: 'command',
      command: 'foo',
      prefix_suffix: false,
    },
  ];

  const result = convertActions(actions);

  expect(result).toMatchSnapshot();
});

test('Should be able to convert notify actions', () => {
  const actions: Action[] = [
    {
      action: 'notify',
      notice: 'foo',
      notice_bg: 'green',
      notice_fg: 'black',
    },
  ];

  const result = convertActions(actions);

  expect(result).toMatchSnapshot();
});


test('Should be able to convert notification actions' ,() => {
  const actions: Action[] = [
    {
      action: 'notification',
      heading: 'Foo',
      text: 'bar'
    }
  ];

  const result = convertActions(actions);

  expect(result).toMatchSnapshot();
});

test('Should be able to convert sound actions', () => {
  const actions: Action[] = [
    {
      action: 'sound',
      sound: 'foo',
    }
  ];

  const result = convertActions(actions);

  expect(result).toMatchSnapshot();
});
