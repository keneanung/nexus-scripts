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
            fn: 'bar',
          },
        ],
      },
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
            fn: 'bar',
          },
        ],
      },
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
            fn: 'bar',
          },
        ],
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

  const result = convertActions(actions, 'foo', 'alias');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert function actions', () => {
  const actions: Action[] = [
    {
      action: 'function',
      fn: 'foo',
    },
  ];

  const result = convertActions(actions, 'foo', 'alias');

  expect(result).toMatchSnapshot();
});

test('Should not convert function actions with empty function name', () => {
  const actions: Action[] = [
    {
      action: 'function',
      fn: '',
    },
  ];

  const result = convertActions(actions, 'foo', 'alias');

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

  const result = convertActions(actions, 'foo', 'alias');

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

  const result = convertActions(actions, 'foo', 'alias');

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

  const result = convertActions(actions, 'foo', 'alias');

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

  const result = convertActions(actions, 'foo', 'alias');

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

  const result = convertActions(actions, 'foo', 'alias');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert notification actions', () => {
  const actions: Action[] = [
    {
      action: 'notification',
      heading: 'Foo',
      text: 'bar',
    },
  ];

  const result = convertActions(actions, 'foo', 'alias');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert sound actions', () => {
  const actions: Action[] = [
    {
      action: 'sound',
      sound: 'foo',
    },
  ];

  const result = convertActions(actions, 'foo', 'alias');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert stop actions', () => {
  const actions: Action[] = [
    {
      action: 'stop',
    },
  ];

  const result = convertActions(actions, 'foo', 'alias');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert disableme actions', () => {
  const actions: Action[] = [
    {
      action: 'disableme',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert variable actions with valtype value', () => {
  const actions: Action[] = [
    {
      action: 'variable',
      op: 'add',
      valtype: 'value',
      varname: 'myVar',
      value: 'myValue',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert variable actions with valtype variable', () => {
  const actions: Action[] = [
    {
      action: 'variable',
      op: 'add',
      valtype: 'variable',
      varname: 'myVar',
      value: 'myValue',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert variable actions with valtype target', () => {
  const actions: Action[] = [
    {
      action: 'variable',
      op: 'add',
      valtype: 'target',
      varname: 'myVar',
      value: 'myValue',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert variable actions with valtype capture', () => {
  const actions: Action[] = [
    {
      action: 'variable',
      op: 'add',
      valtype: 'capture',
      varname: 'myVar',
      value: 'myValue',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert variable actions with op add', () => {
  const actions: Action[] = [
    {
      action: 'variable',
      op: 'add',
      valtype: 'value',
      varname: 'myVar',
      value: 'myValue',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert variable actions with op sub', () => {
  const actions: Action[] = [
    {
      action: 'variable',
      op: 'sub',
      valtype: 'value',
      varname: 'myVar',
      value: 'myValue',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert variable actions with op mul', () => {
  const actions: Action[] = [
    {
      action: 'variable',
      op: 'mul',
      valtype: 'value',
      varname: 'myVar',
      value: 'myValue',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert variable actions with op div', () => {
  const actions: Action[] = [
    {
      action: 'variable',
      op: 'div',
      valtype: 'value',
      varname: 'myVar',
      value: 'myValue',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert variable actions with op set', () => {
  const actions: Action[] = [
    {
      action: 'variable',
      op: 'set',
      valtype: 'value',
      varname: 'myVar',
      value: 'myValue',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert variable actions with op del', () => {
  const actions: Action[] = [
    {
      action: 'variable',
      op: 'del',
      valtype: 'value',
      varname: 'myVar',
      value: 'myValue',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert gag actions', () => {
  const actions: Action[] = [
    {
      action: 'gag',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert highlight actions with type line', () => {
  const actions: Action[] = [
    {
      action: 'highlight',
      highlight: 'line',
      highlight_backref: '1',
      highlight_bg: '#ffffff',
      highlight_fg: '#000000',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert highlight actions with type backref', () => {
  const actions: Action[] = [
    {
      action: 'highlight',
      highlight: 'backref',
      highlight_backref: '1',
      highlight_bg: '#ffffff',
      highlight_fg: '#000000',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert highlight actions with type match', () => {
  const actions: Action[] = [
    {
      action: 'highlight',
      highlight: 'match',
      highlight_backref: '1',
      highlight_bg: '#ffffff',
      highlight_fg: '#000000',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert highlight actions with type prefix', () => {
  const actions: Action[] = [
    {
      action: 'highlight',
      highlight: 'prefix',
      highlight_backref: '1',
      highlight_bg: '#ffffff',
      highlight_fg: '#000000',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert highlight actions with type suffix', () => {
  const actions: Action[] = [
    {
      action: 'highlight',
      highlight: 'suffix',
      highlight_backref: '1',
      highlight_bg: '#ffffff',
      highlight_fg: '#000000',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert button actions with action label', () => {
  const actions: Action[] = [
    {
      action: 'button',
      label: 'myLabel',
      buttonaction: 'label',
      buttonid: '1',
      command: 'myCommand',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert button actions with action command', () => {
  const actions: Action[] = [
    {
      action: 'button',
      label: 'myLabel',
      buttonaction: 'command',
      buttonid: '1',
      command: 'myCommand',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert button actions with action highlight', () => {
  const actions: Action[] = [
    {
      action: 'button',
      label: 'myLabel',
      buttonaction: 'highlight',
      buttonid: '1',
      command: 'myCommand',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert button actions with action unhighlight', () => {
  const actions: Action[] = [
    {
      action: 'button',
      label: 'myLabel',
      buttonaction: 'unhighlight',
      buttonid: '1',
      command: 'myCommand',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});

test('Should be able to convert button actions with action default', () => {
  const actions: Action[] = [
    {
      action: 'button',
      label: 'myLabel',
      buttonaction: 'default',
      buttonid: '1',
      command: 'myCommand',
    },
  ];

  const result = convertActions(actions, 'bar', 'trigger');

  expect(result).toMatchSnapshot();
});
