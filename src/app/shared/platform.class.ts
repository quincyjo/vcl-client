import { Idable } from './idable.interface';

export class Platform implements Idable {
  public id: number;

  constructor(
    public name: string
  ) { }
}
