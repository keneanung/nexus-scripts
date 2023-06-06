/**
 * Class for the Nexus waitFor action
 */
export class WaitForAction implements client.WaitForAction {
  action = 'waitfor' as const;
  text = '';
  matching: 'substring' | 'begins' | 'regexp' | 'exact' = 'substring';
  whole_words = true;
  case_sensitive = true;
  expire = '';

  /**
   * Constructs a new complete waitFor action from a partial one.
   *
   * @param {Partial<client.WaitForAction>} partialWaitForAction The partial waitFor action to construct a new complete waitFor action from.
   */
  constructor(partialWaitForAction: Partial<client.WaitForAction>) {
    if (partialWaitForAction.text !== undefined) {
      this.text = partialWaitForAction.text;
    }

    if (partialWaitForAction.matching !== undefined) {
      this.matching = partialWaitForAction.matching;
    }

    if (partialWaitForAction.whole_words !== undefined) {
      this.whole_words = partialWaitForAction.whole_words;
    }

    if (partialWaitForAction.case_sensitive !== undefined) {
      this.case_sensitive = partialWaitForAction.case_sensitive;
    }

    if (partialWaitForAction.expire !== undefined) {
      this.expire = partialWaitForAction.expire;
    }
  }
}
