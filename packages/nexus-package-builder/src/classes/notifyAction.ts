/**
 * Class for a Nexus notify action.
 */
export class NotifyAction implements client.NotifyAction {
  action = 'notify' as const;
  notice = '';
  notice_fg = '';
  notice_bg = '';

  /**
   * Constructs a new complete notify object from a partial one.
   *
   * @param {Partial<client.NotifyAction>} partialNotifyAction Partial notify object to construct a new complete one from.
   */
  constructor(partialNotifyAction: Partial<client.NotifyAction>) {
    if (partialNotifyAction.notice !== undefined) {
      this.notice = partialNotifyAction.notice;
    }

    if (partialNotifyAction.notice_fg !== undefined) {
      this.notice_fg = partialNotifyAction.notice_fg;
    }

    if (partialNotifyAction.notice_bg !== undefined) {
      this.notice_bg = partialNotifyAction.notice_bg;
    }
  }
}
