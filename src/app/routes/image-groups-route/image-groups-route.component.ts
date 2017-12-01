import { Component, OnInit } from '@angular/core';
import { ImageGroupProviderService } from '../../services/image-group-provider.service';
import { ImageGroup } from '../../shared/image-group.class';
import { ListComponent, ListColumn, ListColumnType, ListOption } from '../../components/list/list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-groups-route',
  templateUrl: './image-groups-route.component.html',
  styleUrls: ['./image-groups-route.component.scss']
})
export class ImageGroupsRouteComponent implements OnInit {

  /** Columns to be displayed by ListComponent for the list of reservations. **/
  public columns: Array<ListColumn> = [
    new ListColumn('Name'),
    new ListColumn('Id')
  ];

  /** Options to be displayed by ListComponent for the list of reservations. **/
  public options: Array<ListOption> = [
    new ListOption('View')
  ];

  get groups(): Array<ImageGroup> { return this._provider.data; }

  constructor(
    private _provider: ImageGroupProviderService,
    private _router: Router
  ) { }

  /**
   * Angular life-cycle hook after the component has been initialized.
   */
  public ngOnInit(): void {
    const iterator = this._provider.asyncIterator();
    let step = (iterator: AsyncIterator<ImageGroup>) => {
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
    //TODO: Request next on ImageGroupProviderService.
  }

  public onListButtonClicked(event: any): void {
    console.log(event);
  }

}
