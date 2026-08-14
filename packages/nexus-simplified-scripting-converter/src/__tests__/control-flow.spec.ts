import { Action, RepeatAction } from '@keneanung/iron-realms-nexus-typings';
import { convertActions, convertActionsWithDiagnostics } from '..';
import { makeNexus, runScript } from '../__test_helpers__/testUtils';

const repeat = (overrides: Partial<RepeatAction> = {}): RepeatAction => ({
  action: 'repeat',
  'cond-type1': 'variable',
  'cond-val1': '',
  'cond-type2': 'value',
  'cond-val2': '',
  'cond-op': 'eq',
  'cond-mod': '',
  'cond-cs': false,
  label: 'done',
  mode: 'count',
  counttype: 'value',
  count: '1',
  ...overrides,
});

test('converts If and Goto actions to readable label functions', () => {
  const actions: Action[] = [
    {
      action: 'if',
      'cond-type1': 'value',
      'cond-val1': 'ONE',
      'cond-type2': 'value',
      'cond-val2': 'one',
      'cond-op': 'eq',
      'cond-mod': '',
      'cond-cs': false,
      dothen: 'jump',
      dothenlabel: 'Finished!',
      doelse: 'continue',
      doelselabel: '',
    },
    { action: 'command', command: 'wrong', prefix_suffix: false },
    { action: 'label', label: 'Finished!' },
    { action: 'command', command: 'right', prefix_suffix: false },
  ];

  const result = convertActionsWithDiagnostics(actions, 'condition', 'alias');

  expect(result.diagnostics).toEqual([]);
  expect(result.script).toContain('function label_Finished_()');
  expect(result.script).toContain('if (_nsscCompare(');
  expect(result.script).toContain('return label_Finished_();');

  const nexus = makeNexus();
  runScript(result.script, nexus.client);
  expect(nexus.client.send_commands).toHaveBeenCalledTimes(1);
  expect(nexus.client.send_commands).toHaveBeenCalledWith('right');
});

test('converts a count Repeat to a for loop', () => {
  const actions: Action[] = [
    repeat({ count: '3' }),
    { action: 'command', command: 'hit rat', prefix_suffix: false },
    { action: 'label', label: 'done' },
  ];

  const script = convertActions(actions, 'counter', 'alias');
  expect(script).toContain('for (let _nsscRepeat0 =');

  const nexus = makeNexus();
  runScript(script, nexus.client);
  expect(nexus.client.send_commands).toHaveBeenCalledTimes(3);
});

test('converts a while Repeat to a while loop', () => {
  const actions: Action[] = [
    repeat({
      mode: 'while',
      'cond-type1': 'variable',
      'cond-val1': 'counter',
      'cond-type2': 'value',
      'cond-val2': '3',
      'cond-op': 'smaller',
    }),
    { action: 'variable', op: 'add', valtype: 'value', varname: 'counter', value: '1' },
    { action: 'label', label: 'done' },
  ];

  const nexus = makeNexus();
  nexus.values.set('counter', 0);
  runScript(convertActions(actions, 'while loop', 'alias'), nexus.client);
  expect(nexus.values.get('counter')).toBe(3);
});

test('converts properly nested Repeat regions', () => {
  const actions: Action[] = [
    repeat({ label: 'outer done', count: '2' }),
    repeat({ label: 'inner done', count: '2' }),
    { action: 'command', command: 'nested', prefix_suffix: false },
    { action: 'label', label: 'inner done' },
    { action: 'label', label: 'outer done' },
  ];

  const nexus = makeNexus();
  runScript(convertActions(actions, 'nested loops', 'alias'), nexus.client);
  expect(nexus.client.send_commands).toHaveBeenCalledTimes(4);
});

test('warns inline and structurally for backward Goto recursion', () => {
  const result = convertActionsWithDiagnostics(
    [
      { action: 'label', label: 'again' },
      { action: 'goto', label: 'again' },
    ],
    'recursive',
    'alias',
  );

  expect(result.diagnostics).toEqual([
    expect.objectContaining({ code: 'NSSC_BACKWARD_GOTO_RECURSION', actionIndex: 1 }),
  ]);
  expect(result.script).toContain('WARNING [NSSC_BACKWARD_GOTO_RECURSION]');
  expect(result.script).toContain('return label_again();');
});

test('converts Disable This Reflex inside structured action lists', () => {
  const script = convertActions(
    [
      { action: 'disableme' },
      { action: 'label', label: 'done' },
    ],
    'one shot',
    'event',
  );

  expect(script).toContain('find_by_name("event", "one shot"');
});

test('leaves an actionable TODO for a Repeat containing Wait', () => {
  const result = convertActionsWithDiagnostics(
    [repeat(), { action: 'wait', seconds: '1', milliseconds: '0' }, { action: 'label', label: 'done' }],
    'async loop',
    'alias',
  );

  expect(result.diagnostics).toEqual([expect.objectContaining({ code: 'NSSC_REPEAT_ASYNC_WAIT' })]);
  expect(result.script).toContain('TODO: This Repeat could not be represented');
});

test('warns when multiple Repeat actions share a boundary label', () => {
  const result = convertActionsWithDiagnostics(
    [
      repeat({ label: 'shared' }),
      repeat({ label: 'shared' }),
      { action: 'command', command: 'once', prefix_suffix: false },
      { action: 'label', label: 'shared' },
    ],
    'shared repeat',
    'alias',
  );

  expect(result.diagnostics.filter(({ code }) => code === 'NSSC_REPEAT_SHARED_LABEL')).toHaveLength(2);
  expect(result.script).not.toContain('for (let _nsscRepeat');
});
