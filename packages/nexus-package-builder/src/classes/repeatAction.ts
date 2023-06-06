/**
 * Class for a Nexus repeat action
 */
export class RepeatAction implements client.RepeatAction {
  action = 'repeat' as const;
  'cond-type1': 'variable' | 'target' | 'value' = 'variable';
  'cond-val1' = '';
  'cond-type2': 'variable' | 'target' | 'value' = 'variable';
  'cond-val2' = '';
  'cond-op': 'eq' | 'greater' | 'smaller' | 'starts' | 'ends' = 'eq';
  'cond-mod': '' | 'not' = '';
  'cond-cs' = false;
  label = '';
  mode: 'count' | 'while' = 'count';

  /**
   * Constructs a new complete repeat action from a partial one.
   *
   * @param {Partial<client.RepeatAction>} partialRepeatAction The partial repeat action to construct a new complete repeat action from
   */
  constructor(partialRepeatAction: Partial<client.RepeatAction>) {
    if (partialRepeatAction['cond-type1'] !== undefined) {
      this['cond-type1'] = partialRepeatAction['cond-type1'];
    }

    if (partialRepeatAction['cond-val1'] !== undefined) {
      this['cond-val1'] = partialRepeatAction['cond-val1'];
    }

    if (partialRepeatAction['cond-type2'] !== undefined) {
      this['cond-type2'] = partialRepeatAction['cond-type2'];
    }

    if (partialRepeatAction['cond-val2'] !== undefined) {
      this['cond-val2'] = partialRepeatAction['cond-val2'];
    }

    if (partialRepeatAction['cond-op'] !== undefined) {
      this['cond-op'] = partialRepeatAction['cond-op'];
    }

    if (partialRepeatAction['cond-mod'] !== undefined) {
      this['cond-mod'] = partialRepeatAction['cond-mod'];
    }

    if (partialRepeatAction['cond-cs'] !== undefined) {
      this['cond-cs'] = partialRepeatAction['cond-cs'];
    }

    if (partialRepeatAction.label !== undefined) {
      this.label = partialRepeatAction.label;
    }

    if (partialRepeatAction.mode !== undefined) {
      this.mode = partialRepeatAction.mode;
    }
  }
}
