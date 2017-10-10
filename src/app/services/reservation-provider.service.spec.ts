import { async, TestBed, inject } from '@angular/core/testing';

import { ReservationProviderService } from './reservation-provider.service';
import { Reservation } from '../shared/reservation.class';
import { MockBackendService } from './mock-backend.service';
import { HttpClient } from '@angular/common/http';
import { Response, Success, Error, CODE } from '../shared/response.class';

describe('ReservationProviderService', () => {
  let mockBackendService: MockBackendService;
  beforeEach(() => {
    mockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      providers: [
        ReservationProviderService,
        { provide: HttpClient, useValue: mockBackendService }
      ]
    });
  });

  it('should be created', inject([ReservationProviderService], (service: ReservationProviderService) => {
    expect(service).toBeTruthy();
  }));

  describe('#_addItem', () => {
    it('should resolve to the item', async(inject([ReservationProviderService], (service: ReservationProviderService) => {
      let newReservation  = new Reservation('A new reservation', new Date(), new Date());
      service._addItem(newReservation)
        .then((result) => {
          expect(result.code).toEqual(CODE.CREATED);
          expect(result.id).toBeDefined();
          expect(isNaN(result.id)).toBeFalsy();
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ReservationProviderService], (service: ReservationProviderService) => {
      service._addItem(undefined)
        .then((result) => {
          fail('Resolved on expected rejection with value: ' + result.toString());
        })
        .catch((error) => {
          expect(error.error).toBeDefined();
        });
    })));
  });

  describe('#_getItem', () => {
    it('should resolve to the response', async(inject([ReservationProviderService], (service: ReservationProviderService) => {
      let targetId = 0;
      service._getItem(targetId)
        .then((reservation) => {
          expect(reservation).toBeDefined();
          expect(reservation.id).toEqual(targetId);
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ReservationProviderService], (service: ReservationProviderService) => {
      service._getItem(-1)
        .then((result) => {
          fail('Resolved on expected rejection with value: ' + result.toString());
        })
        .catch((error) => {
          expect(error).toBeDefined();
          expect(error.error).toBeDefined();
        });
    })));
  });

  describe('#_putItem', () => {
    it('should resolve to the updated item', async(inject([ReservationProviderService], (service: ReservationProviderService) => {
      let start, end: Date = new Date();
      let name: string = 'A new name!'
      let updatedReservation = new Reservation(name, start, end);
      let id = 0;
      updatedReservation.id = id;
      service._putItem(updatedReservation)
        .then((reservation) => {
          expect(reservation).toBeDefined();
          expect(reservation.id).toEqual(id);
          expect(reservation.name).toEqual(name);
          expect(reservation.start).toEqual(start);
          expect(reservation.end).toEqual(end);
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ReservationProviderService], (service: ReservationProviderService) => {
      service._putItem(undefined)
        .then((result) => {
          fail('Resolved on expected rejection with value: ' + result.toString());
        })
        .catch((error) => {
          // TODO: Fix weirdness here...
          // expect(error).toBeDefined();
          // expect(error.error).toBeDefined();
        });
    })));
  });

  describe('#_deleteItem', () => {
    it('should resolve to the deleted item', async(inject([ReservationProviderService], (service: ReservationProviderService) => {
      service._getItem(0)
        .then((reservation) => {
          service._deleteItem(reservation)
            .then((result) => {
              expect(result.id).toEqual(0);
            })
          .catch((error) => {
            fail(error);
          });
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ReservationProviderService], (service: ReservationProviderService) => {
      service._getItem(undefined)
        .then((result) => {
          fail('Resolved on expected rejection with value: ' + result.toString());
        })
        .catch((error) => {
          expect(error).toBeDefined();
          expect(error.error).toBeDefined();
        });
    })));
  });

  describe('#_getFrom', () => {
    it('should default to start 0 and length of 10', async(inject([ReservationProviderService], (service: ReservationProviderService) => {
      service._getFrom()
        .then((reservations) => {
          expect(reservations.length).toEqual(10);
        })
        .catch((error) => {
          fail(error);
        })
    })));

    it('should accept a length', async(inject([ReservationProviderService], (service: ReservationProviderService) => {
      service._getFrom(0, 5)
        .then((reservations) => {
          expect(reservations).toBeDefined();
          expect(Array.isArray(reservations)).toBeTruthy();
          expect(reservations.length).toEqual(5);
        })
        .catch((error) => {
          fail(error);
        });
    })));
  });
});
