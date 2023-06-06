import { PriorityList } from './PriorityList';

function symmetricDifference(setA: Set<string>, setB: Set<string>): Set<string> {
  const difference = new Set(setA);
  setB.forEach((elem) => {
    if (difference.has(elem)) {
      difference.delete(elem);
    } else {
      difference.add(elem);
    }
  });
  return difference;
}

/**
 * Manages the priorities for individual areas.
 */
export class AreaPriorities {
  private priorityLists: { [areaName: string]: PriorityList };

  /**
   * Constructs a new object that is initialized with the given priorities.
   *
   * @param {Object<string,string[]>} priorityDictionary A dictionary with an area name as key and a list of things in order of priority.
   */
  constructor(priorityDictionary: { [areaName: string]: string[] } = {}) {
    this.priorityLists = {};

    for (const areaName in priorityDictionary) {
      this.priorityLists[areaName] = new PriorityList(priorityDictionary[areaName]);
    }
  }

  /**
   * Returns a serializable representation of this object.
   *
   * @returns {Object<string,string[]>} A dictionary with an area name as key and a list of things in order of priority.
   */
  AsDictionary(): { [areaName: string]: string[] } {
    const result: { [areaName: string]: string[] } = {};

    for (const areaName in this.priorityLists) {
      result[areaName] = this.priorityLists[areaName].AsArray();
    }

    return result;
  }

  /**
   * Changes the priorities of the given area to the given list order.
   *
   * @param {string} areaName The name of the area to modify the order of priorities for.
   * @param {string[]} newPriorities The new priority order for the given area.
   * @throws {Error} If the given area does not exist.
   * @throws {Error} If the items in the existing priority list differ from the items in the given priority list.
   */
  SetPriorityOrder(areaName: string, newPriorities: string[]) {
    const existingPriorities = this.priorityLists[areaName]?.AsArray();

    if (!existingPriorities) {
      throw new Error(`Area '${areaName}' does not exist`);
    }

    const existingPrioSet = new Set(existingPriorities);
    const newPrioSet = new Set(newPriorities);

    const difference = symmetricDifference(existingPrioSet, newPrioSet);
    if (difference.size > 0) {
      throw new Error('Redefinig priorities for an area is not allowed this way');
    }

    this.priorityLists[areaName] = new PriorityList(newPriorities);
  }

  /**
   * Returns the priority of the given element in the given area.
   *
   * @param {string} area The name of the area to get the priority of the given thing in.
   * @param {string} name The name of the thing to get the priority of.
   * @returns {number | undefined} The priority of the given thing in the given area.
   */
  GetPriority(area: string, name: string): number | undefined {
    const priorityList = this.priorityLists[area];

    if (!priorityList) {
      return undefined;
    }

    return priorityList.PriorityOf(name);
  }

  /**
   * Appends a new thing to an areas priority list.
   *
   * @param {string} area The area to add the thing to.
   * @param {string} name The thing to append to the areas priority list.
   */
  Append(area: string, name: string) {
    let priorityList = this.priorityLists[area];

    if (!priorityList) {
      priorityList = new PriorityList();
      this.priorityLists[area] = priorityList;
    }

    priorityList.Append(name);
  }

  /**
   * Removes a thing from an areas priority list.
   *
   * @param {string} area The area to remove the thing from.
   * @param {string} name The thing to remove from the areas priority list.
   */
  Remove(area: string, name: string) {
    this.priorityLists[area]?.Remove(name);
  }
}
