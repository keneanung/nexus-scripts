/**
 * Class for a Nexus label action.
 */
export class LabelAction implements client.LabelAction {
  action = 'label' as const;
  label = '';

  /**
   * Constructs a complete label action from a partial one.
   *
   * @param {Partial<client.LabelAction>} partialLabelAction The partial label action to construct a new complete label action from.
   */
  constructor(partialLabelAction: Partial<client.LabelAction>) {
    if (partialLabelAction.label !== undefined) {
      this.label = partialLabelAction.label;
    }
  }
}
