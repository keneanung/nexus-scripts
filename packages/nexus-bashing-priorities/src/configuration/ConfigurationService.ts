import { Configuration, PrimitiveConfiguration } from './Configuration';

/**
 * Interface for classes that defines the query for target priorities.
 */
export interface ITargetPriorityQueryable {
  /**
   * Get the priority of the given target in the given area.
   * @param {string} area The area to query the target for.
   * @param {string} target The target to query the priority for.
   * @returns {number|undefined} The priority of the given target in the given area. If the target is not found, undefined is returned.
   */
  getPriority(area: string, target: string): number | undefined;
}

/**
 * Gives access to the configuration of the bashing system.
 */
export class ConfigurationService implements ITargetPriorityQueryable {
  private configuration: Configuration = new Configuration();

  /**
   * Returns the current configuration as an object of primitive values.
   * @returns {PrimitiveConfiguration} The configuration as an object consisting of primitive data structures.
   */
  public getConfiguration(): PrimitiveConfiguration {
    return this.configuration.AsPrimitive();
  }

  /**
   * Sets the new configuration.
   * @param {PrimitiveConfiguration} configuration The configuration to set.
   */
  public setConfiguration(configuration: PrimitiveConfiguration) {
    this.configuration = new Configuration(configuration);
  }

  /**
   * Adds a new target to the given area priority list.
   * @param {string} area The area to add the target in.
   * @param {string} target The target to add to the priority list.
   */
  public addTargetPriority(area: string, target: string) {
    this.configuration.Priorities.Append(area, target);
  }

  /**
   * Removes the given target from the given area.
   * @param {string} area The area to remove the target from.
   * @param {string} target The target to remove from the priority list.
   */
  public removeTargetPriority(area: string, target: string) {
    this.configuration.Priorities.Remove(area, target);
  }

  public getPriority(area: string, target: string): number | undefined {
    return this.configuration.Priorities.GetPriority(area, target);
  }
}
