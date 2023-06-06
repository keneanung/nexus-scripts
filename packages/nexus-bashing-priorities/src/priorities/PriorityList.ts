/**
 * The priority list of a single area.
 */
export class PriorityList {
  private prios: { [key: string]: number };

  /**
   * Constructs a new priority list from the given array of priorities.
   *
   * @param {string[]} priorities The list of priorities to seed this list with.
   */
  constructor(priorities?: string[]) {
    this.prios = {};

    if (priorities) {
      priorities.forEach((priority, index) => {
        this.prios[priority] = index;
      });
    }
  }

  /**
   * Returns the list of priorities as an array. This is useful for serialization and UIs.
   *
   * @returns {string[]} The list of priorities as an array.
   */
  public AsArray(): string[] {
    return Object.keys(this.prios).sort((a, b) => this.prios[a] - this.prios[b]);
  }

  /**
   * Returns the priority of the given element.
   *
   * @param {string} name The name of the thing to get the priority of.
   * @returns {number} The priority of the given thing.
   */
  public PriorityOf(name: string): number | undefined {
    return this.prios[name];
  }

  /**
   * Appends a new thing to the priority list.
   *
   * @param {string} name The name of the thing to add to the priority list.
   */
  public Append(name: string): void {
    if (this.prios[name]) {
      return;
    }
    this.prios[name] = Object.keys(this.prios).length;
  }

  /**
   * Removes the given thing from the priority list.
   *
   * @param {string} name The name of the thing to remove from the priority list.
   */
  Remove(name: string) {
    delete this.prios[name];
  }
}
