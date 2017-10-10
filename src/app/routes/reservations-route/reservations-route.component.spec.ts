import { Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationProviderService } from '../../services/reservation-provider.service';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MockBackendService } from '../../services/mock-backend.service';
import { HttpClient } from '@angular/common/http';
import { ListComponent } from '../../components/list/list.component';

import { ReservationsRouteComponent } from './reservations-route.component';

@Injectable()
class MockReservatinoProviderService {
  constructor() { }

  get data(): Array<any> { return [] }
}

describe('ReservationsRouteComponent', () => {
  let component: ReservationsRouteComponent;
  let fixture: ComponentFixture<ReservationsRouteComponent>;
  let mockBackendService: MockBackendService;

  beforeEach(async(() => {
    let mockReservatinoProviderService = new MockReservatinoProviderService();
    mockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      declarations: [
        ReservationsRouteComponent,
        ListComponent
      ],
      providers: [
        ReservationProviderService,
        { provide: HttpClient, useValue: mockBackendService }
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
