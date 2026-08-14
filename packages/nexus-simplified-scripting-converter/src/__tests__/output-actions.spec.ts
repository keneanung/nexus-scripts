import { Action } from '@keneanung/iron-realms-nexus-typings';
import { convertActions } from '..';
import { makeNexus, runScript } from '../__test_helpers__/testUtils';

test('updates output positions after Rewrite before Highlight', () => {
  const actions: Action[] = [
    {
      action: 'rewrite',
      rewrite: 'match',
      rewrite_backref: '',
      rewrite_text_type: 'value',
      rewrite_text: 'short',
      rewrite_colors: '',
      rewrite_fg: '',
      rewrite_bg: '',
    },
    {
      action: 'highlight',
      highlight: 'match',
      highlight_backref: '',
      highlight_fg: 'yellow',
      highlight_bg: 'black',
    },
  ];
  const replace = jest.fn();
  const colorize = jest.fn();
  const match = ['long'] as unknown as RegExpExecArray;
  match.index = 3;
  match.input = 'a  long line';
  const nexus = makeNexus();
  Object.assign(nexus.client, {
    current_line: { parsed_line: { text: () => ({ replace, colorize }) } },
    settings: () => ({ convert_bgcolor: (color: string) => color }),
  });

  runScript(convertActions(actions, 'output', 'trigger'), nexus.client, match);
  expect(replace).toHaveBeenCalledWith(3, 7, 'short');
  expect(colorize).toHaveBeenCalledWith(3, 8, 'yellow', 'black');
});

test('converts Linkify text and command values', () => {
  const actions: Action[] = [
    {
      action: 'linkify',
      linkify: 'suffix',
      linkify_backref: '',
      linkify_text_type: 'value',
      linkify_text: 'click me',
      linkify_command_type: 'target',
      linkify_command: '',
      linkify_color: 'cyan',
    },
  ];
  const linkify = jest.fn();
  const match = ['prefix'] as unknown as RegExpExecArray;
  match.index = 0;
  match.input = 'prefix suffix';
  const nexus = makeNexus();
  Object.assign(nexus.client, {
    current_line: { parsed_line: { text: () => ({ linkify }) } },
    settings: () => ({ reverted: false }),
  });

  runScript(convertActions(actions, 'link', 'trigger'), nexus.client, match);
  expect(linkify).toHaveBeenCalledWith(6, 13, 'cyan', 'rat', 'click me', false);
});
