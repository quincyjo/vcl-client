import { Component, OnInit, Inject } from '@angular/core';
import { ReservationProviderService} from '../../services/reservation-provider.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Reservation } from '../../shared/reservation.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Dialog component to add a reservation.
 */
@Component({
  selector: 'app-add-reservation-dialog',
  templateUrl: './add-reservation-dialog.component.html',
  styleUrls: ['./add-reservation-dialog.component.scss']
})
export class AddReservationDialogComponent implements OnInit {
  /** FormGroup for the form to gather reservation information. **/
  public addReservationForm: FormGroup;
  /** Boolean representing the submission status of `addReservationForm`. **/
  public submitted: boolean;
  /** Boolean representing if the form submission was successful or not. **/
  public success: boolean;
  /** Boolean representing if there was an error upon form submission. **/
  public failure: boolean;
  /** The time of form creation for generating form date ranges. **/
  public now: Date;
  /** The end of the reservation to be created. **/
  public end: Date;
  /** An array of number representing the duration slider's indices translations
    * to hours.
    */
  public durations: Array<number>

  /**
   * Constructor.
   * @param  {MdDialogRef<EditReservationDialogComponent>} publicdialogRef An
   * object which sould contain the target reservation to edit in the
   * 'reservation' attribute.
   */
  constructor( public dialogRef: MdDialogRef<AddReservationDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any,
              private _reservationProvider: ReservationProviderService,
              private _formBuilder: FormBuilder) {
    this.durations = [];
    let start: number = 0.5;
    let end: number = 50 * 24;
    while (start < end) {
      this.durations.push(start);
      start = start * 2;
    }
  }

  /**
   * Converts a number of hours to human readable string representing the amount
   * of time in a convenient unit, such as minutes, hours, or days.
   * @param  {number} hours The number of hours to represent.
   * @return {string}       The human readable string.
   */
  public printDuration(hours: number): string {
    if (hours < 1) {
      return hours * 60 + ' min';
    }
    if (hours < 24) {
      return hours + ' hr';
    }
    let days: number = Math.round(hours / 24);
    return days + ' day' + (days === 1 ? '' : 's');
  }

  /**
   * Event handler for the mdSlideToggle change event, determining whether or
   * not the duration of the reservation si infinite or finite.
   * @param {any} event The change event.
   */
  public onIndefiniteChange(event: any): void {
    if (event.checked) {
      this.addReservationForm.get('duration').disable();
    } else {
      this.addReservationForm.get('duration').enable();
    }
  }

  /**
   * Getter for the list of available reservation types.
   * @return {Array<string>} An array of reservation types as strings.
   */
  public getReservationTypes(): Array<string> {
    return this._reservationProvider.getReservationTypes();
  }

  /**
   * Geter for the list of available environments for the reservation.
   * @return {Array<string>} An array of reservation environments as strings.
   */
  public getEnvironments(): Array<string> {
    return this._reservationProvider.getEnvironments();
  }

  /**
   * Handle submission of the form and handle validation and action.
   */
  public onSubmit() {
    this.submitted = true;
    this.dialogRef.close(this._makeReservation());
  }

  /**
   * Internal method for building `addReservationForm`.
   */
  private _buildForm(): void {
    this.now = new Date();
    this.end = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + 7);
    this.addReservationForm = this._formBuilder.group({
      type: [this._reservationProvider.getReservationTypes()[0], Validators.required],
      env: [null, Validators.required],
      now: [true],
      start: [new Date(), Validators.required],
      indefinite: [false],
      duration: [{ value: 1, disabled: false }, Validators.required]
    });
  }

  /**
   * Internal function for creating a Reservation object from the data stored in
   * `addReservationForm`.
   * @return {Reservation} The created Reservation object.
   */
  private _makeReservation(): Reservation {
    let name = this.addReservationForm.get('env').value;
    let start = new Date(this.addReservationForm.get('start').value);
    let end = new Date(start);
    end.setHours(end.getHours() + this.durations[this.addReservationForm.get('duration').value]);
    return new Reservation(
      name, start, end
    );
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
  public ngOnInit() {
    this._buildForm();
  }
}
