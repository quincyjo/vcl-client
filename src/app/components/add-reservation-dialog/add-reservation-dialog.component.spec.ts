import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationProviderService } from '../../services/reservation-provider.service';
import { MockBackendService } from '../../services/mock-backend.service';
import { HttpClient } from '@angular/common/http';

import { AddReservationDialogComponent } from './add-reservation-dialog.component';

class MockMdDialogRef {
  constructor() { }
}

describe('AddReservationDialogComponent', () => {
  let component: AddReservationDialogComponent;
  let fixture: ComponentFixture<AddReservationDialogComponent>;
  let mockBackendService: MockBackendService;

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
    fixture = TestBed.createComponent(AddReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
