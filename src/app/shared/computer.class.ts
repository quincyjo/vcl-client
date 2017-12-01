import { Idable } from './idable.interface';

export class Computer implements Idable {
  /** The ID of the image. **/
  public id: number;

  constructor(
    public stateid: number = 10,
    public ownerid: number = 1,
    public platformid: number = 1,
    public scheduleid: number = 0,
    public vmhostid: number = 0,
    public currentimageid: number = 0,
    public nextimageid: number = 1,
    public imagerevisionid: number = 1,
    public RAM: number = 0,
    public procnumber: number = 1,
    public procspeed: number = 0,
    public network: number = 100,
    public hostname: string = '',
    public ipaddress: string = ''
  ) { }
}
