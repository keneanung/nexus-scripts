/**
 * Class for the Nexus variable action
 */
export class VariableAction implements client.VariableAction {
  action = 'variable' as const;
  varname = '';
  valtype: 'variable' | 'target' | 'value' = 'variable';
  value = '';
  op: 'set' | 'del' | 'add' | 'sub' | 'mul' | 'div' = 'set';

  /**
   * Constructs a new complete variable action from a partial one.
   *
   * @param {Partial<client.VariableAction>} partialVariableAction The partial variable action to construct a complete variable action from.
   */
  constructor(partialVariableAction: Partial<client.VariableAction>) {
    if (partialVariableAction.varname !== undefined) {
      this.varname = partialVariableAction.varname;
    }

    if (partialVariableAction.valtype !== undefined) {
      this.valtype = partialVariableAction.valtype;
    }

    if (partialVariableAction.value !== undefined) {
      this.value = partialVariableAction.value;
    }

    if (partialVariableAction.op !== undefined) {
      this.op = partialVariableAction.op;
    }
  }
}
