import { PartialEvent } from '../types';
import { convertNexusActionArray, IdGenerator } from '../utils';

/**
 * Class for the Nexus event
 */
export class Event implements client.Event {
  name = '';
  id: number;
  type = 'event' as const;
  enabled = true;
  evtype = 'GMCP' as const;
  evsubtype:
    | 'Char.Vitals'
    | 'Char.Afflictions.Add'
    | 'Char.Afflictions.Remove'
    | 'Char.Defences.Add'
    | 'Char.Defences.Remove'
    | 'Room.AddPlayer'
    | 'Room.RemovePlayer'
    | 'Room.Info'
    | 'IRE.Target.Set' = 'Char.Vitals';
  actions: client.Action[] = [];

  /**
   * Constructs a new complete event from a partial one
   *
   * @param {PartialEvent} partialEvent The partial event a new complete event should be constructed from
   * @param {IdGenerator} idGenerator The generator to get this items ID from
   * @param {string} packageDefinitionFile The path to the package definition file
   */
  constructor(partialEvent: PartialEvent, idGenerator: IdGenerator, packageDefinitionFile: string) {
    this.id = idGenerator.getId();

    if (partialEvent.name !== undefined) {
      this.name = partialEvent.name;
    }

    if (partialEvent.enabled !== undefined) {
      this.enabled = partialEvent.enabled;
    }

    if (partialEvent.evsubtype !== undefined) {
      this.evsubtype = partialEvent.evsubtype;
    }

    if (partialEvent.actions !== undefined) {
      this.actions = convertNexusActionArray(partialEvent.actions, packageDefinitionFile);
    }
  }
}
