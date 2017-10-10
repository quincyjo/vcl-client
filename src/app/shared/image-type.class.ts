import { Idable } from './idable.interface';

export class ImageType implements Idable {
  public id: number;

  constructor(
    public name: string
  ) { }
}
