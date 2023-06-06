import { readScriptFileRelativeToDefintion } from '../functionsInteractingWithFileSystem';
import { PartialScriptAction } from '../types';

/**
 * Class for a Nexus script action.
 */
export class ScriptAction implements client.ScriptAction {
  action = 'script' as const;
  script = '';

  /**
   * Constructs a new complete script action object from a partial one.
   *
   * @param {PartialScriptAction} partialScriptAction A partial script object. This object might additionally contain the scriptFile property,
   * which makes this function replace the script property with the content of the given file. The path of that file must
   * be relative to the packageDefinitionFile.
   * @param {string} packageDefinitionFile The (absolute) path to the package definition file that this function pbject is built from.
   */
  constructor(partialScriptAction: PartialScriptAction, packageDefinitionFile: string) {
    if (partialScriptAction.script !== undefined) {
      this.script = partialScriptAction.script;
    }

    if (partialScriptAction.scriptFile !== undefined) {
      this.script = readScriptFileRelativeToDefintion(partialScriptAction.scriptFile, packageDefinitionFile);
    }
  }
}
