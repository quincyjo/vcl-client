import { Idable } from './idable.interface';
import { Group } from './group.class';
import { ComputerGroup } from './computer-group.class';

export class Computer extends Group<ComputerGroup> implements Idable {
  /** The ID of the image. **/
  public id: number;

  constructor(
    /** State id for the group. **/
    public stateId: number = 10,
    /** Owner id for the group. **/
    public ownerId: number = 1,
    /** Platform id for the group. **/
    public platformId: number = 1,
    /** Schedule id for the group. **/
    public scheduleId: number = 0,
    /** VM host id for the group. **/
    public vmhostId: number = 0,
    /** Current image id for the group. **/
    public currentImageId: number = 0,
    /** Next image id for the group. **/
    public nextImageId: number = 1,
    /** Revision id for the group. **/
    public imageRevisionId: number = 1,
    /** RAM required for the group. **/
    public RAM: number = 0,
    /** Proc core number required for the group. **/
    public procNumber: number = 1,
    /** Proc core speed required for the group. **/
    public procSpeed: number = 0,
    /** Network bandwidth required for the group. **/
    public network: number = 100,
    /** The hostname for the group. **/
    public hostname: string = '',
    /** The address for the group. **/
    public ipaddress: string = '',
    /** The computers in the group. **/
    computers: Array<ComputerGroup> = []
  ) {
    super(computers);
  }

  /**
   * Adds the computer to `group`.
   * @param {ComputerGroup} group The ComputerGroup to add the computer to.
   */
  public addGroup(group: ComputerGroup): void {
    super.add(group);
  }

  /**
   * Removes the computer from `group`.
   * @param {ComputerGroup} group The ComputerGroup to remove the computer from.
   */
  public removeGroup(group: ComputerGroup): void {
    super.remove(group);
  }
}
