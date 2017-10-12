import { Idable } from './idable.interface';

/**
 * Class that contains information of an operating system.
 */
export class OS implements Idable {
  /** The ID of the OS. **/
  public id: number;

  constructor(
    /** The name of the OS. **/
    public name: string,
    /** the pretty name for the OS. **/
    public prettyName: string = '',
    /** The type of the OS. **/
    public type: string = null,
    /** The install type of the OS. **/
    public installType: number = 512,
  ) { }
}
