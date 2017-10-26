import { Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationProviderService } from '../../services/reservation-provider.service';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockBackendService } from '../../services/mock-backend.service';
import { HttpClient } from '@angular/common/http';
import { ListComponent } from '../../components/list/list.component';
import { Reservation } from '../../shared/reservation.class';
import { Observable } from 'rxjs';
import { FilterSelectorComponent } from '../../components/list/filter-selector/filter-selector.component';

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
        FilterSelectorComponent,
        ListComponent
      ],
      providers: [
        ReservationProviderService,
        { provide: HttpClient, useValue: mockBackendService }
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
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

  it('should catch error if can\'t load more', () => {
    let spy = spyOn(component['_reservationProvider'], 'next')
      .and.returnValue(Promise.reject('an error'));
    component.loadMore()
      .then((result) => {
        fail('Got valid result on expected rejection.');
      })
      .catch((error) => {
        expect(error).toEqual('an error');
      });
  });

  it('should open an add dialog', () => {
    let spy = spyOn(component.dialog, 'open')
      .and.returnValue({
        afterClosed: () => {
          return Observable.of(9);
        }
      });
    component._openAddDialog();
    expect(spy).toHaveBeenCalled();
  });

  it('should open an edit dialog', () => {
    let spy = spyOn(component.dialog, 'open')
      .and.returnValue({
        afterClosed: () => {
          return Observable.of(9);
        }
      });
    component._openEditDialog(undefined);
    expect(spy).toHaveBeenCalled();
  });

  it('should should call provider to create a reservation', () => {
    let spy = spyOn(component['_reservationProvider'], 'add')
      .and.returnValue(Promise.resolve());
    let res = new Reservation('asdf', new Date(), new Date());
    component._addReservation(
      res
    );
    expect(spy).toHaveBeenCalledWith(res);
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
      let spy = spyOn(component['_reservationProvider'], 'delete')
        .and.returnValue(Promise.resolve());
      component.handleListEvent({event: 'delete', target: res});
      expect(spy).toHaveBeenCalledWith(res);
    }));

    it('should reject with provider error if deletion fails', () => {
      let res = new Reservation('asdf', new Date(), new Date());
      let spy = spyOn(component['_reservationProvider'], 'delete')
        .and.returnValue(Promise.reject('an error'));
      component.handleListEvent({event: 'delete', target: res});
      expect(spy).toHaveBeenCalledWith(res);
    });

    it('should fire load more on onScrolledToBottom', () => {
      let spy = spyOn(component, 'loadMore')
        .and.stub();
      component.onScrolledToBottom({});
      expect(spy).toHaveBeenCalled();
    });
  });
});
