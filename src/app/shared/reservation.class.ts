import { Idable } from './idable.interface';

/**
 * Class that contains information for a reservation.
 */
export class Reservation implements Idable {
  /** The id of the reservation. **/
  public id: number;

  constructor(
    /** The name of the reservation. **/
    public name: string,
    /** The start date of the reservation. **/
    public start: Date,
    /** The end date of the reservation. **/
    public end: Date,
    /** The request id of the reservation. **/
    public request: number = undefined,
    /** The computer id for the reservation. **/
    public computer: number = undefined,
    /** The image id for the reservation. **/
    public image: number = undefined,
    /** The iamge revision id for the reservation. **/
    public imageReveision: number = undefined,
    /** The management node id for the reservation. **/
    public managementNode: number = undefined,
    /** The remote IP address of the reservation. **/
    public remoteIP: string = undefined,
    /** The date at which the reservation was last checked. **/
    public lastCheck: Date = undefined,
    /** The password for the reservation. **/
    public pw: string = undefined,
    /** The IP to connect to the reservation. **/
    public connectIP: string = undefined,
    /** The port on which to connect to the reservaiton. **/
    public connectPort: number = undefined,
    /** The date at which the reservaiton was created. **/
    public created: Date = new Date()
  ) { }

}
