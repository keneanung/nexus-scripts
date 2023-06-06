/**
 * Class for a nexus function action.
 */
export class FunctionAction implements client.FunctionAction {
  action = 'function' as const;
  fn = '';

  /**
   * Constructs a new complete function action object from a partial one.
   *
   * @param {Partial<client.FunctionAction>} partialFunction A partial function action object.
   */
  constructor(partialFunction: Partial<client.FunctionAction>) {
    if (partialFunction.fn !== undefined) {
      this.fn = partialFunction.fn;
    }
  }
}
