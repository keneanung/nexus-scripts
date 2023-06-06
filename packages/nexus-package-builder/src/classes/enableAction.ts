/**
 * Class for Nexus enable action.
 */
export class EnableAction implements client.EnableAction {
  action = 'enable' as const;
  type: 'group' | 'alias' | 'trigger' | 'keybind' | 'event' = 'group';
  name = '';

  /**
   * Constructs a new complete enable action from a partial one.
   *
   * @param {Partial<client.EnableAction>} partialEnableAction The partial enable action to construct a new complete enable action from.
   */
  constructor(partialEnableAction: Partial<client.EnableAction>) {
    if (partialEnableAction.type !== undefined) {
      this.type = partialEnableAction.type;
    }

    if (partialEnableAction.name !== undefined) {
      this.name = partialEnableAction.name;
    }
  }
}
