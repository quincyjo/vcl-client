import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ComputerGroupProviderService } from '../../services/computer-group-provider.service';
import { ComputerGroup } from '../../shared/computer-group.class';
import { ListComponent, ListColumn, ListColumnType, ListOption } from '../../components/list/list.component';
import { Router } from '@angular/router';

/**
 * Render the computer groups as a list.
 */
@Component({
  selector: 'app-computer-groups-route',
  templateUrl: './computer-groups-route.component.html',
  styleUrls: ['./computer-groups-route.component.scss']
})
export class ComputerGroupsRouteComponent implements OnInit {
  @ViewChild('list') list: ElementRef;

  /** Internal representatino of ComputerGroupProviderService.hasNext. **/
  public hasNext: boolean;

  /** Shows if route is waiting on requested data to stall more requests. **/
  public loading: boolean;

  /** Columns to be displayed by ListComponent for the list of reservations. **/
  public columns: Array<ListColumn> = [
    new ListColumn('Name'),
    new ListColumn('ID').setType('number'),
  ];

  /** Options to be displayed by ListComponent for the list of reservations. **/
  public options: Array<ListOption> = [
    new ListOption('View'),
  ];

  /**
   * Getter for the array of reservations to be used in the route's view.
   * @return {Array<ComputerGroup>} An array of ComputerGroup.
   */
  get computerGroups(): Array<ComputerGroup> {
    return this._ComputerGroupProvider.data;
  }

  constructor(private _ComputerGroupProvider: ComputerGroupProviderService,
              private _router: Router) {
    // this._reservationProvider.next();
  }

  /**
   * OnInit hook to request data from the service provider after component
   * inititialization.
   */
  ngOnInit(): void {
    this.hasNext = this._ComputerGroupProvider.hasNext;
  }

  /**
   * AfterViewInit hook to buffer list based on elemen rendering after the view
   * has been initialized.
   */
  ngAfterViewInit(): void {
    // Buffer the list until it feels the screen or all data is loaded.
    let buffer = () => {
      let table: ElementRef = this.list['table'];
      let bottom = window.pageYOffset + window.innerHeight;
      let compiled = table.nativeElement;
      let number = compiled.offsetHeight + compiled.offsetTop;
      if (bottom > number) {
        // Only load more if not waiting on a previous request.
        if (!this.loading) {
          this.loadMore();
        }
        setTimeout(buffer, 50);
      }
    }
    buffer();
  }

  /**
   * Event handler for the ComputerGroupListComponent's requestNext event.
   * @param {any} e The event.
   */
  public loadMore(): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {
      if (this.hasNext && !this.loading) {
        this.loading = true;
        this._ComputerGroupProvider.next()
          .then((result) => {
            this.loading = false;
            this.hasNext = result;
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            // reject(error);
          });
      }
    });
    return promise;
  }

  /**
   * Event handler for buttonClicked events emitted fomr the ViewChild
   * ListComponent.
   * @param {any} event The even emitted from `list`.
   */
  public handleListEvent(event: any): void {
    // console.log(event);
    if (event.event === 'view') {
      this._router.navigate(['computergroups', event.target.id]);
    }
  }

  /**
   * Event handler for the scrolledToBottom event emitted by `list` .
   * @param {any} e The event.
   */
  public onScrolledToBottom(e: any): void {
    this.loadMore();
  }

  private _deleteComputerGroup(reservation: ComputerGroup): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this._ComputerGroupProvider.delete(reservation)
        .then((result) => {
          resolve(reservation);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  }

  /**
   * Submits a reservation to the service provider to be added.
   * @param {ComputerGroup} reservation The reservation to add.
   */
  public _addComputerGroup(reservation: ComputerGroup): void {
    this._ComputerGroupProvider.add(reservation)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
