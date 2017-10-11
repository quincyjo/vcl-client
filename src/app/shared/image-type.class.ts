import { Idable } from './idable.interface';

/**
 * Class which contains image type information.
 */
export class ImageType implements Idable {
  /** ID of the image. **/
  public id: number;

  constructor(
    /** The name of the image type. **/
    public name: string
  ) { }
}
