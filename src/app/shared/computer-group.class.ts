import { Idable } from './idable.interface';
import { Group } from './group.class';
import { Computer } from './computer.class';

export class ComputerGroup extends Group<Computer> implements Idable {
  /** The ID of the omputer group. **/
  public id: number;

  constructor(
    /** The name of the group. **/
    public name: string,
    /** The computers in the group. **/
    public computers: Array<Computer> = []
  ) {
    super(computers);
    this.name = name;
  }

  /**
   * Adds a computer to the group.
   * @param {Computer} computer The computer to ad..
   */
  addToGroup(computer: Computer): void {
    super.add(computer);
  }

  /**
   * Removes a computer from the group.
   * @param {Computer} computer The computer to remove.
   */
  removeFromGroup(computer: Computer): void {
    super.remove(computer);
  }
}
