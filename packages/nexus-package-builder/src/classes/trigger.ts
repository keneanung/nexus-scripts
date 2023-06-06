import { PartialTrigger } from '../types';
import { convertNexusActionArray, IdGenerator } from '../utils';

/**
 * Class for a Nexus trigger
 */
export class Trigger implements client.Trigger {
  name = '';
  id: number;
  type = 'trigger' as const;
  enabled = true;
  text = '';
  matching: 'exact' | 'begins' | 'regexp' | 'substring' = 'exact';
  whole_words = true;
  case_sensitive = true;
  actions: client.Action[] = [];

  /**
   * Constructs a new complete trigger from a partial one.
   *
   * @param {PartialTrigger} partialTrigger The partial trigger that should be converted to a new complete trigger.
   * @param {IdGenerator} idGenerator The generator to retrieve this item's ID from.
   * @param {string} packageDefinitionFile The path to the package definition file.
   */
  constructor(partialTrigger: PartialTrigger, idGenerator: IdGenerator, packageDefinitionFile: string) {
    this.id = idGenerator.getId();

    if (partialTrigger.name !== undefined) {
      this.name = partialTrigger.name;
    }

    if (partialTrigger.enabled !== undefined) {
      this.enabled = partialTrigger.enabled;
    }

    if (partialTrigger.text !== undefined) {
      this.text = partialTrigger.text;
    }

    if (partialTrigger.matching !== undefined) {
      this.matching = partialTrigger.matching;
    }

    if (partialTrigger.whole_words !== undefined) {
      this.whole_words = partialTrigger.whole_words;
    }

    if (partialTrigger.case_sensitive !== undefined) {
      this.case_sensitive = partialTrigger.case_sensitive;
    }

    if (partialTrigger.actions !== undefined) {
      this.actions = convertNexusActionArray(partialTrigger.actions, packageDefinitionFile);
    }
  }
}
