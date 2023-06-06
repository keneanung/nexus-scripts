import { PartialAlias } from '../types';
import { convertNexusActionArray, IdGenerator } from '../utils';

/**
 * Class for the Nexus alias
 */
export class Alias implements client.Alias {
  name = '';
  id: number;
  type = 'alias' as const;
  enabled = true;
  matching: 'exact' | 'begins' | 'regexp' = 'exact';
  whole_words = true;
  case_sensitive = true;
  prefix_suffix = true;
  text = '';
  actions: client.Action[] = [];

  /**
   * Constructs a new complete alias from a partial one.
   *
   * @param {PartialAlias} partialAlias The partial alias that should be used to construct the new complete alias.
   * @param {IdGenerator} idGenerator The IdGenerator to retrieve this alias' ID from.
   * @param {string} packageDefinitionFile The path to the package definition file.
   */
  constructor(partialAlias: PartialAlias, idGenerator: IdGenerator, packageDefinitionFile: string) {
    this.id = idGenerator.getId();

    if (partialAlias.name !== undefined) {
      this.name = partialAlias.name;
    }

    if (partialAlias.enabled !== undefined) {
      this.enabled = partialAlias.enabled;
    }

    if (partialAlias.matching !== undefined) {
      this.matching = partialAlias.matching;
    }

    if (partialAlias.whole_words !== undefined) {
      this.whole_words = partialAlias.whole_words;
    }

    if (partialAlias.case_sensitive !== undefined) {
      this.case_sensitive = partialAlias.case_sensitive;
    }

    if (partialAlias.prefix_suffix !== undefined) {
      this.prefix_suffix = partialAlias.prefix_suffix;
    }

    if (partialAlias.text !== undefined) {
      this.text = partialAlias.text;
    }

    if (partialAlias.actions !== undefined) {
      this.actions = convertNexusActionArray(partialAlias.actions, packageDefinitionFile);
    }
  }
}
