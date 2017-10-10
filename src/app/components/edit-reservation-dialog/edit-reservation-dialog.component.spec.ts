import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationProviderService } from '../../services/reservation-provider.service';
import { MockBackendService } from '../../services/mock-backend.service';
import { HttpClient } from '@angular/common/http';

import { EditReservationDialogComponent } from './edit-reservation-dialog.component';

class MockMdDialogRef {
  constructor() { }
}

describe('EditReservationDialogComponent', () => {
  let component: EditReservationDialogComponent;
  let fixture: ComponentFixture<EditReservationDialogComponent>;
  let mockBackendService: MockBackendService;

  beforeEach(async(() => {
    let mockMdDialogData = {
      reservation: {
        name: 'A reservation name!'
      }
    };
    let mockMdDialogRef = new MockMdDialogRef();
    mockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      declarations: [
        EditReservationDialogComponent
      ],
      providers: [
        ReservationProviderService,
        { provide: MdDialogRef, useValue: mockMdDialogRef},
        { provide: MD_DIALOG_DATA, useValue: mockMdDialogData},
        { provide: HttpClient, useValue: mockBackendService }
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
    fixture = TestBed.createComponent(EditReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the reservation name in the name input', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#reservationName').value).toContain('A reservation name!')
  }));
});
