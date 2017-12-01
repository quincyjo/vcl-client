import { Idable } from './idable.interface';
import { Group } from './group.class';
import { Computer } from './computer.class';

export class ComputerGroup extends Group<Computer> implements Idable {
  /** The ID of the omputer group. **/
  public id: number;

  /** The name of the group. **/
  public name: string;

  constructor(
    name: string,
    computers: Array<Computer> = []) {
    super(computers);
    this.name = name;
  }
}
