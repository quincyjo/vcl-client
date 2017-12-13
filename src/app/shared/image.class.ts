import { Idable } from './idable.interface';
import { User } from './user.class';
import { ImageType } from './image-type.class';
import { Platform } from './platform.class';
import { OS } from './os.class';
import { Group } from './group.class';
import { ImageGroup } from './image-group.class';

/**
 * Class which contains the information for an image.
 */
export class Image extends Group<ImageGroup> implements Idable {
  /**
   * Rebuilds the image from a static JSON meta data as received from the API
   * to a full local object.
   * @param  {Image} image The image meta data to build from.
   * @return {Image}       The fully rebuild Image object.
   */
  static rebuild(image: Image): Image {
    let rebuilt = new Image(image.name);
    for (let key of Object.keys(image)) {
      rebuilt[key] = image[key];
    }
    return rebuilt;
  }

  /** The ID of the image. **/
  public id: number;
  /** The type of the image. **/
  public type: ImageType;
  /** The platform of the image. **/
  public platform: Platform;
  /** The OS of the image. **/
  public os: OS;

  get groups(): Array<ImageGroup> { return this.value; }

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
    public description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In neque sapien, malesuada a suscipit ut, mollis non dui. Vestibulum sollicitudin consequat rutrum. Vivamus ut odio a tellus interdum molestie. Proin et augue suscipit, consequat sapien at, rhoncus lectus. Aliquam vitae posuere erat, quis auctor felis. Nunc lacinia aliquet urna. Quisque consequat justo a euismod lacinia. Donec rutrum, lorem sed maximus tincidunt, nibh mauris hendrerit neque, a scelerisque nibh leo quis quam. Fusce vitae massa et lacus sollicitudin tempus eu nec magna.',
    /** The use case for the imaga. **/
    public usage: string = '',
    /** The parent image revision number. **/
    public basedOffRevisionId: number = null,
    /** The image groups to which the image belongs. **/
    groups: Array<ImageGroup> = []
  ) {
    super(groups);
  }

  /**
   * Adds the image to `group`.
   * @param {ImageGroup} group The ImageGroup to add the image to.
   */
  public addGroup(group: ImageGroup): void {
    super.add(group);
  }

  /**
   * Removes the image from `group`.
   * @param {ImageGroup} group The ImageGroup to remove the image from.
   */
  public removeGroup(group: ImageGroup): void {
    super.remove(group);
  }
}

/**
 * Allowed projects for an image.
 */
export type Project = 'vcl' | 'hpc' | 'vclhpc';

/**
 * Allowed architectures for an image.
 */
export type Architecture = 'x86' | 'x86_64';
