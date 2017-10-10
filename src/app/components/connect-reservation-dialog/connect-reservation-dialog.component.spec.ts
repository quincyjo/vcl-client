import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationProviderService } from '../../services/reservation-provider.service';

import { ConnectReservationDialogComponent } from './connect-reservation-dialog.component';

class MockMdDialogRef {
  constructor() { }
}

describe('ConnectReservationDialogComponent', () => {
  let component: ConnectReservationDialogComponent;
  let fixture: ComponentFixture<ConnectReservationDialogComponent>;

  beforeEach(async(() => {
    let mockMdDialogData = {
      reservation: {}
    };
    let mockMdDialogRef = new MockMdDialogRef();
    TestBed.configureTestingModule({
      declarations: [
        ConnectReservationDialogComponent
      ],
      providers: [
        ReservationProviderService,
        { provide: MdDialogRef, useValue: mockMdDialogRef},
        { provide: MD_DIALOG_DATA, useValue: mockMdDialogData}
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        MdNativeDateModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
