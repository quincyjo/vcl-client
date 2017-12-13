import { Idable } from './idable.interface';
import { Image } from './image.class';
import { Group } from './group.class';

export class ImageGroup extends Group<Image> implements Idable {
  /**
   * Rebuilds the image from a static JSON meta data as received from the API
   * to a full local object.
   * @param  {ImageGroup} image The image meta data to build from.
   * @return {ImageGroup}       The fully rebuild Image object.
   */
  static rebuild(imageGroup: ImageGroup): ImageGroup {
    let rebuilt = new ImageGroup(imageGroup.name);
    for (let key of Object.keys(imageGroup)) {
      rebuilt[key] = imageGroup[key];
    }
    return rebuilt;
  }

  /** The ID of the image group. **/
  public id: number;

  constructor(
    /** The name of the group. **/
    public name: string,
    /** The images in the group. **/
    public images: Array<Image> = []
  ) {
    super(images);
  }

  /**
   * Ads an image to the group.
   * @param {Image} image The image to add.
   */
  addToGroup(image: Image): void {
    super.add(image);
  }

  /**
   * Removes an image from the group.
   * @param {Image} image The image to remove.
   */
  removeFromGroup(image: Image): void {
    super.remove(image);
  }
}
