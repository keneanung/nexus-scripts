/**
 * Class for nexus if actions
 */
export class IfAction implements client.IfAction {
  action = 'if' as const;
  'cond-type1': 'variable' | 'target' | 'value' = 'variable';
  'cond-val1' = '';
  'cond-type2': 'variable' | 'target' | 'value' = 'variable';
  'cond-val2' = '';
  'cond-op': 'eq' | 'greater' | 'smaller' | 'starts' | 'ends' = 'eq';
  'cond-mod': '' | 'not' = '';
  'cond-cs' = false;
  dothen: 'continue' | 'stop' | 'jump' = 'continue';
  doelse: 'continue' | 'stop' | 'jump' = 'continue';
  dothenlabel = '';
  doelselabel = '';

  /**
   * Constructs a new complete if action from a partial one.
   *
   * @param {Partial<client.IfAction>} partialIfAction Partial if action to construct a new complete if action from.
   */
  constructor(partialIfAction: Partial<client.IfAction>) {
    if (partialIfAction['cond-type1'] !== undefined) {
      this['cond-type1'] = partialIfAction['cond-type1'];
    }

    if (partialIfAction['cond-val1'] !== undefined) {
      this['cond-val1'] = partialIfAction['cond-val1'];
    }
    if (partialIfAction['cond-type2'] !== undefined) {
      this['cond-type2'] = partialIfAction['cond-type2'];
    }

    if (partialIfAction['cond-val2'] !== undefined) {
      this['cond-val2'] = partialIfAction['cond-val2'];
    }

    if (partialIfAction['cond-op'] !== undefined) {
      this['cond-op'] = partialIfAction['cond-op'];
    }

    if (partialIfAction['cond-mod'] !== undefined) {
      this['cond-mod'] = partialIfAction['cond-mod'];
    }

    if (partialIfAction['cond-cs'] !== undefined) {
      this['cond-cs'] = partialIfAction['cond-cs'];
    }

    if (partialIfAction.dothen !== undefined) {
      this.dothen = partialIfAction.dothen;
    }

    if (partialIfAction.doelse !== undefined) {
      this.doelse = partialIfAction.doelse;
    }

    if (partialIfAction.dothenlabel !== undefined) {
      this.dothenlabel = partialIfAction.dothenlabel;
    }

    if (partialIfAction.doelselabel !== undefined) {
      this.doelselabel = partialIfAction.doelselabel;
    }
  }
}
