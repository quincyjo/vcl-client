import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationProviderService } from '../../services/reservation-provider.service';
import { EventManagerService } from '../../services/event-manager.service';
import { MockBackendService } from '../../services/mock-backend.service';
import { HttpClient } from '@angular/common/http';

import { AddReservationDialogComponent } from './add-reservation-dialog.component';

class MockMdDialogRef {
  constructor() { }

  public close(): void {

  }
}

describe('AddReservationDialogComponent', () => {
  let component: AddReservationDialogComponent;
  let fixture: ComponentFixture<AddReservationDialogComponent>;
  let mockBackendService: MockBackendService;
  let eventManager: EventManagerService;

  beforeEach(async(() => {
    let mockMdDialogData = {};
    let mockMdDialogRef = new MockMdDialogRef();
    mockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      declarations: [
        AddReservationDialogComponent
      ],
      providers: [
        ReservationProviderService,
        { provide: MdDialogRef, useValue: mockMdDialogRef},
        { provide: MD_DIALOG_DATA, useValue: mockMdDialogData},
        { provide: HttpClient, useValue: mockBackendService },
        { provide: EventManagerService, useValue: eventManager }
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
        MdNativeDateModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should print formatted duration', () => {
    expect(component.printDuration(0.5)).toEqual('30 min');
    expect(component.printDuration(1)).toEqual('1 hr');
    expect(component.printDuration(2)).toEqual('2 hr');
    expect(component.printDuration(24)).toEqual('1 day');
    expect(component.printDuration(48)).toEqual('2 days');
  });

  it('should disable/enable duration slider on indefinite change', () => {
    component.onIndefiniteChange({checked: false});
    expect(component.addReservationForm.get('duration').enabled).toBeTruthy();
    component.onIndefiniteChange({checked: true});
    expect(component.addReservationForm.get('duration').enabled).toBeFalsy();
  });

  it('should close on the reservation on submit', () => {
    let spy = spyOn(component.dialogRef, 'close')
      .and.stub();
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('should close on a null click', () => {
    let spy = spyOn(component.dialogRef, 'close')
      .and.stub();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should make a reservation from the form', () => {
    let form = component.addReservationForm;
    let now = new Date();
    let end = new Date(now);
    end.setDate(end.getDate() + 1);
    form.get('env').setValue('A reservation!');
    form.get('start').setValue(now);
    form.get('duration').setValue(24);
    let reservation = component.makeReservation();
    expect(reservation.name).toEqual('A reservation!');
    expect(reservation.start).toEqual(now);
    // expect(reservation.end).toEqual(end);
  });
});
