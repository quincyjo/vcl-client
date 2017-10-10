import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Reservation } from '../../shared/reservation.class';
import { ReservationProviderService } from '../../services/reservation-provider.service';

/**
 * A dialog component that allows the modification of the given reservation.
 */
@Component({
  selector: 'app-edit-reservation-dialog',
  templateUrl: './edit-reservation-dialog.component.html',
  styleUrls: ['./edit-reservation-dialog.component.scss']
})
export class EditReservationDialogComponent implements OnInit {
  /** The target reservation, given through `dialogRef`. **/
  public reservation: Reservation;
  /** THe FormGroup for the edit reservatino form. **/
  public editReservationForm: FormGroup;
  /** Boolean representing if the form has been submitted or not. **/
  public submitted: boolean;
  /** Boolean representing the status of the form after submission. **/
  public success: boolean;
  /** Boolean representing if an error occured upon form submission. **/
  public error: boolean;

  /**
   * Constructor.
   * @param  {MdDialogRef<EditReservationDialogComponent>} publicdialogRef An
   * object which sould contain the target reservation to edit in the
   * 'reservation' attribute.
   */
  constructor(public dialogRef: MdDialogRef<EditReservationDialogComponent>,
              private _reservationProvider: ReservationProviderService,
              private _formBuilder: FormBuilder,
              @Inject(MD_DIALOG_DATA) public data: any) {
  }

  /**
   * Build the form group for the edit reservation form.
   */
  private _buildForm(): void {
    this.editReservationForm = this._formBuilder.group({
      name: [this.reservation.name, Validators.required]
    });
  }

  /**
   * Handle submission of the form and handle validation and action.
   */
  public onSubmit(): void {
    this.submitted = true;
    this.reservation.name = this.editReservationForm.get('name').value;
    this._reservationProvider.put(this.reservation)
    .then((success) => {
      console.log(success);
      this.dialogRef.close();
    })
    .catch((error) => {
      console.log(error);
    });
  }

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
    this._buildForm();
  }

}
