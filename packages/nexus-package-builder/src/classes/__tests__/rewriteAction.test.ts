import { RewriteAction } from '../rewriteAction';
import * as client from '@keneanung/iron-realms-nexus-typings';

test('Should initialize all members', () => {
  const rewriteAction = new RewriteAction({});

  expect(rewriteAction).toMatchObject({
    action: 'rewrite',
    rewrite: 'match',
    rewrite_backref: '',
    rewrite_text_type: '',
    rewrite_text: '',
    rewrite_colors: '',
    rewrite_fg: '',
    rewrite_bg: '',
  });
});

test('Should overwrite the rewrite property if given', () => {
  const partialRewrite: Partial<client.RewriteAction> = { rewrite: 'prefix' };

  const rewriteAction = new RewriteAction(partialRewrite);

  expect(rewriteAction).toMatchObject({
    rewrite: 'prefix',
  });
});

test('Should overwrite the rewrite_backref property if given', () => {
  const partialRewrite: Partial<client.RewriteAction> = { rewrite_backref: 'foo' };

  const rewriteAction = new RewriteAction(partialRewrite);

  expect(rewriteAction).toMatchObject({
    rewrite_backref: 'foo',
  });
});

test('Should overwrite the rewrite_text_type property if given', () => {
  const partialRewrite: Partial<client.RewriteAction> = { rewrite_text_type: 'value' };

  const rewriteAction = new RewriteAction(partialRewrite);

  expect(rewriteAction).toMatchObject({
    rewrite_text_type: 'value',
  });
});

test('Should overwrite the rewrite_text property if given', () => {
  const partialRewrite: Partial<client.RewriteAction> = { rewrite_text: 'this is a rewrite text' };

  const rewriteAction = new RewriteAction(partialRewrite);

  expect(rewriteAction).toMatchObject({
    rewrite_text: 'this is a rewrite text',
  });
});

test('Should overwrite the rewrite_colors property if given', () => {
  const partialRewrite: Partial<client.RewriteAction> = { rewrite_colors: 'all' };

  const rewriteAction = new RewriteAction(partialRewrite);

  expect(rewriteAction).toMatchObject({
    rewrite_colors: 'all',
  });
});

test('Should overwrite the rewrite_fg property if given', () => {
  const partialRewrite: Partial<client.RewriteAction> = { rewrite_fg: 'foreground' };

  const rewriteAction = new RewriteAction(partialRewrite);

  expect(rewriteAction).toMatchObject({
    rewrite_fg: 'foreground',
  });
});

test('Should overwrite the rewrite_bg property if given', () => {
  const partialRewrite: Partial<client.RewriteAction> = { rewrite_bg: 'background' };

  const rewriteAction = new RewriteAction(partialRewrite);

  expect(rewriteAction).toMatchObject({
    rewrite_bg: 'background',
  });
});
