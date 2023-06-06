/**
 * Class for a nexus button action.
 */
export class ButtonAction implements client.ButtonAction {
  action = 'button' as const;
  label = '';
  buttonid = '';
  buttonaction: 'label' | 'command' | 'highlight' | 'unhighlight' | 'default' = 'label';
  command = '';

  /**
   * Constructs a new complete button action object from a partial one.
   *
   * @param {Partial<client.ButtonAction>} partialButtonAction A partial button action object.
   */
  constructor(partialButtonAction: Partial<client.ButtonAction>) {
    if (partialButtonAction.label !== undefined) {
      this.label = partialButtonAction.label;
    }

    if (partialButtonAction.buttonid !== undefined) {
      this.buttonid = partialButtonAction.buttonid;
    }

    if (partialButtonAction.buttonaction !== undefined) {
      this.buttonaction = partialButtonAction.buttonaction;
    }

    if (partialButtonAction.command !== undefined) {
      this.command = partialButtonAction.command;
    }
  }
}
