import { Idable } from './idable.interface';

export class Reservation implements Idable {
  public id: number;

  constructor(
    public name: string,
    public start: Date,
    public end: Date,
    public request: number = undefined,
    public computer: number = undefined,
    public image: number = undefined,
    public imageReveision: number = undefined,
    public managementNode: number = undefined,
    public remoteIP: string = undefined,
    public lastCheck: Date = undefined,
    public pw: string = undefined,
    public connectIP: string = undefined,
    public connectPort: number = undefined,
    public created: Date = new Date()
  ) { }

}
