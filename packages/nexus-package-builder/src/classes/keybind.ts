import { PartialKeybind } from '../types';
import { convertNexusActionArray, IdGenerator } from '../utils';

/**
 * Class for Nexus keybind
 */
export class Keybind implements client.Keybind {
  name = '';
  id: number;
  type = 'keybind' as const;
  enabled = true;
  key = 0;
  key_alt = false;
  key_ctrl = false;
  key_shift = false;
  actions: client.Action[] = [];

  constructor(partialKeybind: PartialKeybind, idGenerator: IdGenerator, packageDefinitionFile: string) {
    this.id = idGenerator.getId();

    if (partialKeybind.name !== undefined) {
      this.name = partialKeybind.name;
    }

    if (partialKeybind.enabled !== undefined) {
      this.enabled = partialKeybind.enabled;
    }

    if (partialKeybind.key !== undefined) {
      this.key = partialKeybind.key;
    }

    if (partialKeybind.key_alt !== undefined) {
      this.key_alt = partialKeybind.key_alt;
    }

    if (partialKeybind.key_ctrl !== undefined) {
      this.key_ctrl = partialKeybind.key_ctrl;
    }

    if (partialKeybind.key_shift !== undefined) {
      this.key_shift = partialKeybind.key_shift;
    }

    if (partialKeybind.actions !== undefined) {
      this.actions = convertNexusActionArray(partialKeybind.actions, packageDefinitionFile);
    }
  }
}
