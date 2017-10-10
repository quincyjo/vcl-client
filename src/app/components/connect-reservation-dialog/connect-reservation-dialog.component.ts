import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Reservation } from '../../shared/reservation.class';

/**
 * Dialog component to show connection information for the given reservation.
 */
@Component({
  selector: 'app-connect-reservation-dialog',
  templateUrl: './connect-reservation-dialog.component.html',
  styleUrls: ['./connect-reservation-dialog.component.scss']
})
export class ConnectReservationDialogComponent implements OnInit {
  /** The reservation to display information for. **/
  public reservation: Reservation;

  /**
   * Constructor.
   * @param  {MdDialogRef<EditReservationDialogComponent>} publicdialogRef An
   * object which sould contain the target reservation to display in the
   * 'reservation' attribute.
   */
  constructor(public dialogRef: MdDialogRef<ConnectReservationDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) { }

  /**
   * Called when the user clicks outside of the dialog.
   */
  public onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * OnInit life cycle hook to bind data and build the form after component
   * inititialization.
   */
  public ngOnInit(): void {
    this.reservation = this.data.reservation;
  }

}
