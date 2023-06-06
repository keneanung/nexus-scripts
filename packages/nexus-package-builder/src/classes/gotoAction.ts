/**
 * Class for nexus goto actions
 */
export class GotoAction implements client.GotoAction {
  action = 'goto' as const;
  label = '';

  /**
   * Constructs a new complete goto action from a partial one.
   *
   * @param {Partial<client.GotoAction>} partialGotoAction Partial goto action to construct a new complete goto action from.
   */
  constructor(partialGotoAction: Partial<client.GotoAction>) {
    if (partialGotoAction.label !== undefined) {
      this.label = partialGotoAction.label;
    }
  }
}
