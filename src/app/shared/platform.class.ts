import { Idable } from './idable.interface';

/**
 * Class that contains the information for a platform.
 * @param  {string} name The name of the platform.
 */
export class Platform implements Idable {
  /** The ID of the platform. **/
  public id: number;

  constructor(
    /** The name of the platform. **/
    public name: string
  ) { }
}
