import { Package } from '@keneanung/iron-realms-nexus-typings';
import { convertActions, convertPackage } from '..';

test('converts event actions', () => {
  const pkg: Package = {
    name: 'events',
    description: '',
    enabled: true,
    type: 'group',
    items: [
      {
        type: 'event',
        name: 'target',
        enabled: true,
        evtype: 'GMCP',
        evsubtype: 'IRE.Target.Set',
        actions: [{ action: 'command', command: 'consider @match', prefix_suffix: false }],
      },
    ],
  };

  expect(convertPackage(pkg)).toEqual([]);
  expect(pkg.items[0]).toMatchObject({ actions: [{ action: 'script' }] });
});

test('reports and embeds a TODO for control flow crossing Wait For', () => {
  const pkg: Package = {
    name: 'wait crossing',
    description: '',
    enabled: true,
    type: 'group',
    items: [
      {
        type: 'alias',
        name: 'crossing',
        enabled: true,
        matching: 'exact',
        whole_words: true,
        case_sensitive: true,
        prefix_suffix: false,
        text: 'cross',
        actions: [
          { action: 'label', label: 'before' },
          {
            action: 'waitfor',
            text: 'ready',
            matching: 'exact',
            whole_words: true,
            case_sensitive: true,
            expire: '10',
          },
          { action: 'goto', label: 'before' },
        ],
      },
    ],
  };

  const diagnostics = convertPackage(pkg);
  expect(diagnostics).toEqual([expect.objectContaining({ code: 'NSSC_WAITFOR_CROSSING' })]);
  expect(JSON.stringify(pkg)).toContain('TODO [NSSC_WAITFOR_CROSSING]');
});

test('escapes user-provided strings as JavaScript literals', () => {
  const script = convertActions(
    [{ action: 'command', command: 'say "hello"\nand goodbye', prefix_suffix: false }],
    'escaping',
    'alias',
  );
  expect(() => new Function('args', 'nexusclient', 'current_package', script)).not.toThrow();
});
