import { Idable } from './idable.interface';

export class OS implements Idable {
  public id: number;

  constructor(
    public name: string,
    public prettyName: string = '',
    public type: string,
    public installType: number = 512,
  ) { }
}
