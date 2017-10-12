import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ReservationProviderService } from '../../services/reservation-provider.service';
import { Reservation } from '../../shared/reservation.class';
import { MdDialog } from '@angular/material';
import { ListComponent, ListColumn, ListColumnType, ListOption } from '../../components/list/list.component';
import { AddReservationDialogComponent } from '../../components/add-reservation-dialog/add-reservation-dialog.component';
import { ConnectReservationDialogComponent } from '../../components/connect-reservation-dialog/connect-reservation-dialog.component';
import { EditReservationDialogComponent } from '../../components/edit-reservation-dialog/edit-reservation-dialog.component';

/**
 * Parent route component for the reservations page. Displays reservations and
 * reservation management tools to the user.
 */
@Component({
  selector: 'app-reservations-route',
  templateUrl: './reservations-route.component.html',
  styleUrls: ['./reservations-route.component.scss']
})
export class ReservationsRouteComponent implements OnInit, AfterViewInit {
  @ViewChild('list') list: ElementRef;

  /** Internal representatino of ReservationProviderService.hasNext. **/
  public hasNext: boolean;

  /** Shows if route is waiting on requested data to stall more requests. **/
  public loading: boolean;

  /** Columns to be displayed by ListComponent for the list of reservations. **/
  public columns: Array<ListColumn> = [
    new ListColumn('Name'),
    new ListColumn('Ending', 'end', 'date'),
    new ListColumn('ID').setType('number'),
    new ListColumn('', 'Connect', 'button')
  ];

  /** Options to be displayed by ListComponent for the list of reservations. **/
  public options: Array<ListOption> = [
    new ListOption('Edit'),
    new ListOption('End').setEvent('delete').setMany(true),
    new ListOption('Create Image'),
    new ListOption('Reboot').setMany(true),
    new ListOption('Reinstall').setMany(true)
  ];

  /**
   * Getter for the array of reservations to be used in the route's view.
   * @return {Array<Reservation>} An array of Reservation.
   */
  get reservations(): Array<Reservation> {
    return this._reservationProvider.data;
  }

  constructor(public _reservationProvider: ReservationProviderService,
              public dialog: MdDialog) {
    // this._reservationProvider.next();
  }

  /**
   * OnInit hook to request data from the service provider after component
   * inititialization.
   */
  ngOnInit(): void {
    this.hasNext = this._reservationProvider.hasNext;
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
  /**
   * Event handler for the ReservationListComponent's requestNext event.
   * @param {any} e The event.
   */
  public loadMore(): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {
      if (this.hasNext && !this.loading) {
        this.loading = true;
        this._reservationProvider.next()
          .then((result) => {
            this.loading = false;
            this.hasNext = result;
            resolve(result);
          })
          .catch((error) => {
            reject(error);
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
    if (event.event === 'create') {
      this._openAddDialog();
    } else if (event.event === 'edit') {
      this._openEditDialog(event.target);
    } else if (event.event === 'delete') {
      this._deleteReservation(event.target);
    }
  }

  /**
   * Event handler for the scrolledToBottom event emitted by `list` .
   * @param {any} e The event.
   */
  public onScrolledToBottom(e: any): void {
    this.loadMore();
  }

  /**
   * Opens an AddReservationDialogComponent for the user.
   */
  public _openAddDialog(): void {
    let dialogRef = this.dialog.open(AddReservationDialogComponent, {
      width: '450px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this._addReservation(result);
    });
  }

  /**
   * Opens an EditReservationDialogComponent for the user.
   * @param {Reservation} reservation The target reservation to edit.
   */
  public _openEditDialog(reservation: Reservation): void {
    let dialogRef = this.dialog.open(EditReservationDialogComponent, {
      width: '450px',
      data: { reservation: reservation }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private _deleteReservation(reservation: Reservation): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this._reservationProvider.delete(reservation)
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
   * @param {Reservation} reservation The reservation to add.
   */
  private _addReservation(reservation: Reservation): void {
    this._reservationProvider.add(reservation)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
