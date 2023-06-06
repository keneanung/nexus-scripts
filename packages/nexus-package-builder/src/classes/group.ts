import { PartialGroup } from '../types';
import { convertNexusReflexArray, IdGenerator } from '../utils';

/**
 * Class for a Nexus group.
 */
export class Group implements client.Group {
  name = '';
  id = 0;
  type = 'group' as const;
  enabled = true;
  items: client.Reflex[] = [];

  /**
   * Creates a complete group object from a partial one.
   *
   * @param {PartialGroup} partialGroup A partial group object.
   * @param {IdGenerator} idGenerator The IdGenerator to use for retrieving the ID.
   * @param {string} packageDefinitionFile The (absolute) path to the package definition file that this function pbject is built from.
   */
  constructor(partialGroup: PartialGroup, idGenerator: IdGenerator, packageDefinitionFile: string) {
    this.id = idGenerator.getId();

    if (partialGroup.name !== undefined) {
      this.name = partialGroup.name;
    }

    if (partialGroup.enabled !== undefined) {
      this.enabled = partialGroup.enabled;
    }

    if (partialGroup.items !== undefined) {
      this.items = convertNexusReflexArray(partialGroup.items, idGenerator, packageDefinitionFile);
    }
  }
}
