import { Component, OnInit } from '@angular/core';
import { ImageProviderService } from '../../services/image-provider.service';
import { Image } from '../../shared/image.class';
import { ListComponent, ListColumn, ListColumnType, ListOption } from '../../components/list/list.component';
import { Router } from '@angular/router';

/**
 * Route that displays images and their information and actions.
 */
@Component({
  selector: 'app-images-route',
  templateUrl: './images-route.component.html',
  styleUrls: ['./images-route.component.scss']
})
export class ImagesRouteComponent implements OnInit {

  /** Columns to be displayed by ListComponent for the list of reservations. **/
  public columns: Array<ListColumn> = [
    new ListColumn('Name'),
    new ListColumn('Owner', 'owner.email'),
    new ListColumn('Image Type', 'type.name'),
    new ListColumn('Platform', 'platform.name'),
    new ListColumn('OS', 'os.prettyName')
  ];

  /** Options to be displayed by ListComponent for the list of reservations. **/
  public options: Array<ListOption> = [
    new ListOption('View')
  ];

  /**
   * Getter for the array of images to be rendered in the list.
   * @return {Array<Image>} The list of images.
   */
  get images(): Array<Image> { return this._provider.data; }

  constructor(
    private _provider: ImageProviderService,
    private _router: Router
  ) { }

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

  /**
   * Event handler for the ListComponent's buttonClicked event, which will
   * handle the event based on the button event.
   */
  public onListButtonClicked(event: any): void {
    console.log(event);
    if (event.event === 'view') {
      this._router.navigate(['images', event.target.id]);
    }
  }
}
