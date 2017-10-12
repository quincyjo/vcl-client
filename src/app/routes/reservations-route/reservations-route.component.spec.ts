import { Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationProviderService } from '../../services/reservation-provider.service';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MockBackendService } from '../../services/mock-backend.service';
import { HttpClient } from '@angular/common/http';
import { ListComponent } from '../../components/list/list.component';
import { Reservation } from '../../shared/reservation.class';

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
  let reservationProvider: ReservationProviderService;

  beforeEach(async(() => {
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

  describe('list events', () => {
    it('should handle create by opening an add dialog', async(() => {
      let spy = spyOn(component, '_openAddDialog')
        .and.stub();
      component.handleListEvent({event: 'create'});
      expect(spy).toHaveBeenCalled();
    }));

    it('should handle edit by opening an edit dialog on the target', async(() => {
      let res = new Reservation('asdf', new Date(), new Date());
      let spy = spyOn(component, '_openEditDialog')
        .and.stub();
      component.handleListEvent({event: 'edit', target: res});
      expect(spy).toHaveBeenCalledWith(res);
    }));

    it('should handle delete by opening attempting to delete it', async(() => {
      let res = new Reservation('asdf', new Date(), new Date());
      let spy = spyOn(component._reservationProvider, 'delete')
        .and.returnValue(Promise.resolve());
      component.handleListEvent({event: 'delete', target: res});
      expect(spy).toHaveBeenCalledWith(res);
    }));
  });
});
