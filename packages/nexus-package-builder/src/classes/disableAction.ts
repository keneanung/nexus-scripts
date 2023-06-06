/**
 * Class for Nexus disable action.
 */
export class DisableAction implements client.DisableAction {
  action = 'disable' as const;
  type: 'group' | 'alias' | 'trigger' | 'keybind' | 'event' = 'group';
  name = '';

  /**
   * Constructs a new complete disable action from a partial one.
   *
   * @param {Partial<client.DisableAction>} partialDisableAction The partial disable action to construct a new complete disable action from.
   */
  constructor(partialDisableAction: Partial<client.DisableAction>) {
    if (partialDisableAction.type !== undefined) {
      this.type = partialDisableAction.type;
    }

    if (partialDisableAction.name !== undefined) {
      this.name = partialDisableAction.name;
    }
  }
}
