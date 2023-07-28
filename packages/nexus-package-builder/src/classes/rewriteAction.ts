import * as client from '@keneanung/iron-realms-nexus-typings';
/**
 * Class for a Nexus rewrite action
 */
export class RewriteAction implements client.RewriteAction {
  action = 'rewrite' as const;
  rewrite: 'match' | 'line' | 'prefix' | 'suffix' | 'backref' = 'match';
  rewrite_backref = '';
  rewrite_text_type = '';
  rewrite_text = '';
  rewrite_colors = '';
  rewrite_fg = '';
  rewrite_bg = '';

  /**
   * Constructs a new complete rewrite action from a partial one.
   * @param {Partial<client.RewriteAction>} partialRewriteAction The partial rewrite action to construct a complete rewrite action from
   */
  constructor(partialRewriteAction: Partial<client.RewriteAction>) {
    if (partialRewriteAction.rewrite !== undefined) {
      this.rewrite = partialRewriteAction.rewrite;
    }

    if (partialRewriteAction.rewrite_backref !== undefined) {
      this.rewrite_backref = partialRewriteAction.rewrite_backref;
    }

    if (partialRewriteAction.rewrite_text_type !== undefined) {
      this.rewrite_text_type = partialRewriteAction.rewrite_text_type;
    }

    if (partialRewriteAction.rewrite_text !== undefined) {
      this.rewrite_text = partialRewriteAction.rewrite_text;
    }

    if (partialRewriteAction.rewrite_colors !== undefined) {
      this.rewrite_colors = partialRewriteAction.rewrite_colors;
    }

    if (partialRewriteAction.rewrite_fg !== undefined) {
      this.rewrite_fg = partialRewriteAction.rewrite_fg;
    }

    if (partialRewriteAction.rewrite_bg !== undefined) {
      this.rewrite_bg = partialRewriteAction.rewrite_bg;
    }
  }
}
