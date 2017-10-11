import { Idable } from './idable.interface';

/**
 * Class which contains information for a user.
 * @param  {string}        email         The email for the user.
 * @param  {string = ''}   firstname     The first name of the user.
 * @param  {string = ''}   lastname      The last name of the user.
 * @param  {string}        preferredname The preferred name of the user.
 * @param  {number = 1}    affiliationid The affiliation ID for the user.
 * @param  {string = ''}   unityid       The uniti ID for the user.
 * @param  {number = null} uid           The universal ID for the user.
 */
export class User implements Idable {
  /** The id of the user. **/
  public id: number;

  constructor(
    /** The email of the user. **/
    public email: string,
    /** The first name of the user. **/
    public firstname: string = '',
    /** The last name of the user. **/
    public lastname: string = '',
    /** The preferred name for the user. **/
    public preferredname?: string,
    /** The affiliation id of the user. **/
    public affiliationid: number = 1,
    /** The unity id of the user. **/
    public unityid: string = '',
    /** The universal identifier for the user. **/
    public uid: number = null,
  ) { }
}
