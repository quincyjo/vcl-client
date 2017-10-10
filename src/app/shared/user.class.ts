import { Idable } from './idable.interface';

export class User implements Idable {
  public id: number;

  constructor(
    public email: string,
    public firstname: string = '',
    public lastname: string = '',
    public preferredname?: string,
    public affiliationid: number = 1,
    public unityid: string = '',
    public uid: number = null,
  ) { }
}
