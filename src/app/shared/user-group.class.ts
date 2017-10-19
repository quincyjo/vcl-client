import { Idable } from './idable.interface';

/**
 * Class which contains the information for a user group.
 */
export class UserGroup implements Idable {
  public id: number;

  constructor(
    /** The name of the user group. **/
    public name: string,
    /** The affiliation id for the user group. **/
    public affiliationId: number = null,
    /** The editing user group id. **/
    public editUserGroupId: number = null,
    /** No idea. **/
    public custom: number = 0,
    /** The course roll for the user grou. No Idea. **/
    public courseRoll: number = 0,
    /** Initial max time for reservations from the user group. **/
    public initialMaxTime: number = 240,
    /** The total max time for reservations from the user group. **/
    public totalMaxTime: number = 360,
    /** The max extend time for reservations from the user group. **/
    public maxExtendTime: number = 60,
    /** The number of overlapping resources allowed for the user group. **/
    public overlapResCount: number = 0
  ) { }
}
