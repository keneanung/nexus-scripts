import { readScriptFileRelativeToDefintion } from '../functionsInteractingWithFileSystem';
import { PartialFunction } from '../types';
import { IdGenerator } from '../utils';

/**
 * Class representing a function nexus reflex object.
 */
export class NexusFunction implements client.Function {
  name = '';
  id = 0;
  type = 'function' as const;
  enabled = true;
  code = '';

  /**
   * Creates a complete function object from a partial one.
   *
   * @param {PartialFunction} partialFunction A partial function object. This object might additionally contain the codeFile property,
   * which makes this function replace the code property with the content of the given file. The path of that file must
   * be relative to the packageDefinitionFile.
   * @param {IdGenerator} idGenerator The IdGenerator to use for retrieving the ID.
   * @param {string} packageDefinitionFile The (absolute) path to the package definition file that this function pbject is built from.
   */
  constructor(partialFunction: PartialFunction, idGenerator: IdGenerator, packageDefinitionFile: string) {
    this.id = idGenerator.getId();

    if (partialFunction.name !== undefined) {
      this.name = partialFunction.name;
    }

    if (partialFunction.enabled !== undefined) {
      this.enabled = partialFunction.enabled;
    }

    if (partialFunction.code !== undefined) {
      this.code = partialFunction.code;
    }

    if (partialFunction.codeFile !== undefined) {
      this.code = readScriptFileRelativeToDefintion(partialFunction.codeFile, packageDefinitionFile);
    }
  }
}
