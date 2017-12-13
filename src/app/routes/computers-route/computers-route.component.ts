import { Component, OnInit } from '@angular/core';
import { ComputerProviderService } from '../../services/computer-provider.service';
import { Computer } from '../../shared/computer.class';
import { ListComponent, ListColumn, ListColumnType, ListOption } from '../../components/list/list.component';
import { Router } from '@angular/router';

/**
 * Displays the computers management page.
 */
@Component({
  selector: 'app-computers-route',
  templateUrl: './computers-route.component.html',
  styleUrls: ['./computers-route.component.scss']
})
export class ComputersRouteComponent implements OnInit {

  /** Columns to be displayed by ListComponent for the list of reservations. **/
  public columns: Array<ListColumn> = [
    new ListColumn('Hostname'),
    new ListColumn('Address', 'ipaddress'),
    new ListColumn('State', 'stateId'),
    new ListColumn('Owner', 'ownerId'),
    new ListColumn('Platform', 'platformId')
  ];

  /** Options to be displayed by ListComponent for the list of reservations. **/
  public options: Array<ListOption> = [
    new ListOption('View')
  ];

  /**
   * Getter for the array of computers to be rendered in the list.
   * @return {Array<Computer>} The list of computers.
   */
  get computers(): Array<Computer> { return this._provider.data; }

  constructor(
    private _provider: ComputerProviderService,
    private _router: Router
  ) { }

  /**
   * Angular life-cycle hook after the component has been initialized.
   */
  public ngOnInit(): void {
    const iterator = this._provider.asyncIterator();
    let step = (iterator: AsyncIterator<Computer>) => {
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
   * Event handler for the ListComponent's scrolledToBottom event, which will
   * request to load more computers from the provider in the future.
   */
  public onScrolledToBottom(): void {
    console.log('asdlkjasd');
    //TODO: Request next on ComputerProviderService.
  }

  /**
   * Event handler for the ListComponent's buttonClicked event, which will
   * handle the event based on the button event.
   */
  public onListButtonClicked(event: any): void {
    if (event.event === 'view') {
      this._router.navigate(['computers', event.target.id]);
    }
  }
}
