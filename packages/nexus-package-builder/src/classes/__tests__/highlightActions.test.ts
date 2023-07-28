import { HighlightAction } from "../highlightAction";
import * as client from '@keneanung/iron-realms-nexus-typings'


test('Should initialize all members', () => {
  const highlightAction = new HighlightAction({});

  expect(highlightAction).toMatchObject({
    action: 'highlight',
    highlight: 'match',
    highlight_fg: '',
    highlight_bg: '',
    highlight_backref: '',
  });
});

test('Should overwrite the highlight property if given', () => {
  const partialHighlight: Partial<client.HighlightAction> = { highlight: "prefix" };

  const highlightAction = new HighlightAction(partialHighlight);

  expect(highlightAction).toMatchObject({
    highlight: 'prefix',
  });
});

test('Should overwrite the highlight_fg property if given', () => {
  const partialHighlight: Partial<client.HighlightAction> = { highlight_fg: "0xFFFFFF" };

  const highlightAction = new HighlightAction(partialHighlight);

  expect(highlightAction).toMatchObject({
    highlight_fg: '0xFFFFFF',
  });
});

test('Should overwrite the highlight_bg property if given', () => {
  const partialHighlight: Partial<client.HighlightAction> = { highlight_bg: "0xFFFFFF" };

  const highlightAction = new HighlightAction(partialHighlight);

  expect(highlightAction).toMatchObject({
    highlight_bg: '0xFFFFFF',
  });
});

test('Should overwrite the highlight_backref property if given', () => {
  const partialHighlight: Partial<client.HighlightAction> = { highlight_backref: "0xFFFFFF" };

  const highlightAction = new HighlightAction(partialHighlight);

  expect(highlightAction).toMatchObject({
    highlight_backref: '0xFFFFFF',
  });
});