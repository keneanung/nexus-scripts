/**
 * Class for the Nexus wait action
 */
export class WaitAction implements client.WaitAction {
  action = 'wait' as const;
  seconds = '';
  milliseconds = '';

  /**
   * Constructs a new complete wait action from a partial one.
   *
   * @param {Partial<client.WaitAction>} partialWaitAction The partial wait action to construct a new complete wait action from.
   */
  constructor(partialWaitAction: Partial<client.WaitAction>) {
    if (partialWaitAction.seconds !== undefined) {
      this.seconds = partialWaitAction.seconds;
    }

    if (partialWaitAction.milliseconds !== undefined) {
      this.milliseconds = partialWaitAction.milliseconds;
    }
  }
}
