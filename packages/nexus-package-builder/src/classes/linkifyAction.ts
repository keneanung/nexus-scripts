import * as client from '@keneanung/iron-realms-nexus-typings';
/**
 * Class for a Nexus linkify action
 */
export class LinkifyAction implements client.LinkifyAction {
  action = 'linkify' as const;
  linkify: 'match' | 'line' | 'prefix' | 'suffix' | 'backref' = 'match';
  linkify_backref = '';
  linkify_text_type = '';
  linkify_text = '';
  linkify_command_type = '';
  linkify_command = '';
  linkify_color = '';

  /**
   * Constructs a new complete linkify action from a partial one.
   * @param {Partial<client.LinkifyAction>} partialLinkifyAction The partial linkify action to construct a complete linkify action from
   */
  constructor(partialLinkifyAction: Partial<LinkifyAction>) {
    if (partialLinkifyAction.linkify !== undefined) {
      this.linkify = partialLinkifyAction.linkify;
    }

    if (partialLinkifyAction.linkify_backref !== undefined) {
      this.linkify_backref = partialLinkifyAction.linkify_backref;
    }

    if (partialLinkifyAction.linkify_text_type !== undefined) {
      this.linkify_text_type = partialLinkifyAction.linkify_text_type;
    }

    if (partialLinkifyAction.linkify_text !== undefined) {
      this.linkify_text = partialLinkifyAction.linkify_text;
    }

    if (partialLinkifyAction.linkify_command_type !== undefined) {
      this.linkify_command_type = partialLinkifyAction.linkify_command_type;
    }

    if (partialLinkifyAction.linkify_command !== undefined) {
      this.linkify_command = partialLinkifyAction.linkify_command;
    }

    if (partialLinkifyAction.linkify_color !== undefined) {
      this.linkify_color = partialLinkifyAction.linkify_color;
    }
  }
}
