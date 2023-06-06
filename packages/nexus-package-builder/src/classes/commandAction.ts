/**
 * Class for nexus command actions.
 */
export class CommandAction implements client.CommandAction {
  action = 'command' as const;
  command = '';
  prefix_suffix = true;

  /**
   * Constructs a new complete command action from a partial one.
   *
   * @param {Partial<client.CommandAction>} partialCommandAction Partial command action to construct a new command action from.
   */
  constructor(partialCommandAction: Partial<client.CommandAction>) {
    if (partialCommandAction.command !== undefined) {
      this.command = partialCommandAction.command;
    }

    if (partialCommandAction.prefix_suffix !== undefined) {
      this.prefix_suffix = partialCommandAction.prefix_suffix;
    }
  }
}
