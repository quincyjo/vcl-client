import { TestBed, inject, async } from '@angular/core/testing';

import { ComputerProviderService } from './computer-provider.service';
import { MockBackendService } from './mock-backend.service';
import { HttpClient } from '@angular/common/http';
import { Response, Success, Error, CODE } from '../shared/response.class';
import { EventManagerService } from './event-manager.service';
import { Computer } from '../shared/computer.class';

describe('ComputerProviderService', () => {
  let mockBackendService: MockBackendService;
  let eventManager: EventManagerService;

  beforeEach(() => {
    mockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      providers: [
        ComputerProviderService,
        { provide: HttpClient, useValue: mockBackendService },
        { provide: EventManagerService, useValue: eventManager }
      ]
    });
  });

  it('should be created', inject([ComputerProviderService], (service: ComputerProviderService) => {
    expect(service).toBeTruthy();
  }));

  describe('#_addItem', () => {
    it('should resolve to the item', async(inject([ComputerProviderService], (service: ComputerProviderService) => {
      let newComputer  = new Computer();
      service._addItem(newComputer)
        .then((result) => {
          expect(result.code).toEqual(CODE.CREATED);
          expect(result.id).toBeDefined();
          expect(isNaN(result.id)).toBeFalsy();
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ComputerProviderService], (service: ComputerProviderService) => {
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
    it('should resolve to the response', async(inject([ComputerProviderService], (service: ComputerProviderService) => {
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

    it('should reject with server error', async(inject([ComputerProviderService], (service: ComputerProviderService) => {
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
    it('should resolve to the updated item', async(inject([ComputerProviderService], (service: ComputerProviderService) => {
      let start, end: Date = new Date();
      let name: string = 'A new name!'
      let updatedComputer = new Computer();
      let id = 0;
      updatedComputer.id = id;
      service._putItem(updatedComputer)
        .then((reservation) => {
          expect(reservation).toBeDefined();
          expect(reservation.id).toEqual(id);
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ComputerProviderService], (service: ComputerProviderService) => {
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
    it('should resolve to the deleted item', async(inject([ComputerProviderService], (service: ComputerProviderService) => {
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

    it('should reject with server error', async(inject([ComputerProviderService], (service: ComputerProviderService) => {
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
});
