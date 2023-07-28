import { LinkifyAction } from '../linkifyAction';
import * as client from '@keneanung/iron-realms-nexus-typings';

test('Should initialize all members', () => {
  const linkifyAction = new LinkifyAction({});

  expect(linkifyAction).toMatchObject({
    action: 'linkify',
    linkify: 'match',
    linkify_backref: '',
    linkify_text_type: '',
    linkify_text: '',
    linkify_command_type: '',
    linkify_command: '',
    linkify_color: '',
  });
});

test('Should overwrite the linkify property if given', () => {
  const partialLinkify: Partial<client.LinkifyAction> = { linkify: 'prefix' };

  const linkifyAction = new LinkifyAction(partialLinkify);

  expect(linkifyAction).toMatchObject({
    linkify: 'prefix',
  });
});

test('Should overwrite the linkify_backref property if given', () => {
  const partialLinkify: Partial<client.LinkifyAction> = { linkify_backref: 'foo' };

  const linkifyAction = new LinkifyAction(partialLinkify);

  expect(linkifyAction).toMatchObject({
    linkify_backref: 'foo',
  });
});

test('Should overwrite the linkify_text_type property if given', () => {
  const partialLinkify: Partial<client.LinkifyAction> = { linkify_text_type: 'value' };

  const linkifyAction = new LinkifyAction(partialLinkify);

  expect(linkifyAction).toMatchObject({
    linkify_text_type: 'value',
  });
});

test('Should overwrite the linkify_text property if given', () => {
  const partialLinkify: Partial<client.LinkifyAction> = { linkify_text: 'this is a linkify text' };

  const linkifyAction = new LinkifyAction(partialLinkify);

  expect(linkifyAction).toMatchObject({
    linkify_text: 'this is a linkify text',
  });
});

test('Should overwrite the linkify_command_type property if given', () => {
  const partialLinkify: Partial<client.LinkifyAction> = { linkify_command_type: 'value' };

  const linkifyAction = new LinkifyAction(partialLinkify);

  expect(linkifyAction).toMatchObject({
    linkify_command_type: 'value',
  });
});

test('Should overwrite the linkify_command property if given', () => {
  const partialLinkify: Partial<client.LinkifyAction> = { linkify_command: 'this is a linkify command' };

  const linkifyAction = new LinkifyAction(partialLinkify);

  expect(linkifyAction).toMatchObject({
    linkify_command: 'this is a linkify command',
  });
});

test('Should overwrite the linkify_color property if given', () => {
  const partialLinkify: Partial<client.LinkifyAction> = { linkify_color: '#ffffff' };

  const linkifyAction = new LinkifyAction(partialLinkify);

  expect(linkifyAction).toMatchObject({
    linkify_color: '#ffffff',
  });
});
