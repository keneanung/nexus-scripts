import { AreaPriorities } from '../priorities/AreaPriorities';

export type PrimitiveConfiguration = {
  priorities?: { [areaName: string]: string[] };
};

/**
 *  Collects the current state of the configuration.
 */
export class Configuration {
  /**
   * The target priorities of the individual areas.
   */
  public readonly Priorities: AreaPriorities;

  /**
   * Constructs a new configuration from the given primitive configuration object.
   * @param {PrimitiveConfiguration} config The configuration to use.
   */
  constructor(config: PrimitiveConfiguration = {}) {
    this.Priorities = new AreaPriorities(config.priorities);
  }

  /**
   * Converts this configuration domain object to a collection of primitive values.
   * @returns {PrimitiveConfiguration} The current configuration as a primitive configuration object that can be serialized.
   */
  public AsPrimitive(): PrimitiveConfiguration {
    return {
      priorities: this.Priorities.AsDictionary(),
    };
  }
}
