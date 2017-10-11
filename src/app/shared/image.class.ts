import { Idable } from './idable.interface';
import { User } from './user.class';
import { ImageType } from './image-type.class';
import { Platform } from './platform.class';
import { OS } from './os.class';

/**
 * Class which contains the information for an image.
 */
export class Image implements Idable {
  /** The ID of the image. **/
  public id: number;
  /** The type of the image. **/
  public type: ImageType;
  /** The platform of the image. **/
  public platform: Platform;
  /** The OS of the image. **/
  public os: OS;

  constructor(
    /** The name of the image. **/
    public name: string,
    /** The pretty name for the image. **/
    public prettyName: string = name,
    /** The id for the user who owns the iamge. **/
    public ownerId: number = 0,
    /** The ownder as a User of the image. **/
    public owner?: User,
    /** The iamge type id for the image. **/
    public typeId: number = 0,
    /** The platform id for the image. **/
    public platformId: number = 0,
    /** The OS id for the image. **/
    public OSId: number = 0,
    /** The id for the metadata for the image. **/
    public imageMetaId: number = NaN,
    /** The minimum RAM needed for the image. **/
    public minRam: number = 0,
    /** The minimum number of processors needed for the image. **/
    public minProcNumber: number = 0,
    /** The minimum processor speed needed for the image. **/
    public minProcSpeed: number = 0,
    /** The minimum network speed needed for the image. **/
    public minNetwork: number = 0,
    /** The maximum number of concurency allowed for the image. **/
    public maxConcurrent: number = 0,
    /** The time required to reload the iamge. **/
    public reloadTime: number = 10,
    /** If the image has been deleted or not. **/
    public deleted: boolean = false,
    /** If the image is a test image or not. **/
    public test: boolean = false,
    /** The date of when the image was last updated. **/
    public lastUpdate: Date = null,
    /** If the image is available for checkout. **/
    public forCheckout: boolean = true,
    /** Something. **/
    public maxInitialTime: number = 0,
    /** The project type of the image. **/
    public project: Project = 'vcl',
    /** The size of the image. **/
    public size: number = 0,
    /** The architecture of the iamge. **/
    public architecture: Architecture = 'x86',
    /** A description of the iamge. **/
    public description: string = '',
    /** The use case for the image. **/
    public usage: string = '',
    /** The parent image revision number. **/
    public basedOffRevisionId: number = null,
  ) { }

}

/**
 * Allowed projects for an image.
 */
export type Project = 'vcl' | 'hpc' | 'vclhpc';

/**
 * Allowed architectures for an image.
 */
export type Architecture = 'x86' | 'x86_64';
