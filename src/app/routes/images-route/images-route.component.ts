import { Component, OnInit } from '@angular/core';
import { ImageProviderService } from '../../services/image-provider.service';
import { Image } from '../../shared/image.class';

/**
 * Route that displays images and their information and actions.
 */
@Component({
  selector: 'app-images-route',
  templateUrl: './images-route.component.html',
  styleUrls: ['./images-route.component.scss']
})
export class ImagesRouteComponent implements OnInit {
  /** Columns to be rendered by ListComponent. **/
  public columns = [
    {
      header: 'Name',
      value: 'name'
    }, {
      header: 'Owner',
      value: 'owner.email'
    }, {
      header: 'Image Type',
      value: 'type.name'
    }, {
      header: 'Platform',
      value: 'platform.name'
    }, {
      header: 'OS',
      value: 'os.prettyName'
    }
  ];

  /**
   * Getter for the array of images to be rendered in the list.
   * @return {Array<Image>} The list of images.
   */
  get images(): Array<Image> { return this._provider.data; }

  constructor(private _provider: ImageProviderService) { }

  /**
   * Angular life-cycle hook after the component has been initialized.
   */
  public ngOnInit(): void {
    const iterator = this._provider.asyncIterator();
    let step = (iterator: AsyncIterator<Image>) => {
      iterator.next()
        .then((result) => {
          if (!result.done) step(iterator);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    step(iterator);
  }

  /**
   * Event handler for the ListComponent's scrolledToBottom even, which will
   * request to load more images from the provider in the future.
   */
  public onScrolledToBottom(): void {
    console.log('asdlkjasd');
    //TODO: Request next on ImageProviderService.
  }
}
