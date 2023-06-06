/**
 * Class for a Nexus notification action
 */
export class NotificationAction implements client.NotificationAction {
  action = 'notification' as const;
  heading = '';
  text = '';

  /**
   * Constructs a new complete notification action from a partial one.
   *
   * @param {Partial<client.NotificationAction>} partialNotification The partial notification action to construct a complete notification action from
   */
  constructor(partialNotification: Partial<client.NotificationAction>) {
    if (partialNotification.heading !== undefined) {
      this.heading = partialNotification.heading;
    }

    if (partialNotification.text !== undefined) {
      this.text = partialNotification.text;
    }
  }
}
