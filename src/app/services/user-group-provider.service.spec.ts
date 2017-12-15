import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { UserGroupProviderService } from './user-group-provider.service';
import { MockBackendService, USER_GROUPS } from './mock-backend.service';
import { UserGroup } from '../shared/user-group.class';
import { EventManagerService } from './event-manager.service';
import { Response, Success, Error, CODE } from '../shared/response.class';

describe('UserGroupProviderService', () => {
  let eventManager: EventManagerService;

  beforeEach(() => {
    let backend: MockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      providers: [
        UserGroupProviderService,
        { provide: HttpClient, useValue: backend },
        { provide: EventManagerService, useValue: eventManager }
      ]
    });
  });

  it('should be created', inject([UserGroupProviderService], (service: UserGroupProviderService) => {
    expect(service).toBeTruthy();
  }));

  describe('#_addItem', () => {
    it('should resolve to the item', async(inject([UserGroupProviderService], (service: UserGroupProviderService) => {
      let newUserGroup  = new UserGroup('A new reservation');
      service._addItem(newUserGroup)
        .then((result) => {
          expect(result.code).toEqual(CODE.CREATED);
          expect(result.id).toBeDefined();
          expect(isNaN(result.id)).toBeFalsy();
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([UserGroupProviderService], (service: UserGroupProviderService) => {
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
    it('should resolve to the response', async(inject([UserGroupProviderService], (service: UserGroupProviderService) => {
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

    it('should reject with server error', async(inject([UserGroupProviderService], (service: UserGroupProviderService) => {
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
    it('should resolve to the updated item', async(inject([UserGroupProviderService], (service: UserGroupProviderService) => {
      let name: string = 'A new name!'
      let updatedUserGroup = new UserGroup(name);
      let id = 0;
      updatedUserGroup.id = id;
      service._putItem(updatedUserGroup)
        .then((reservation) => {
          expect(reservation).toBeDefined();
          expect(reservation.id).toEqual(id);
          expect(reservation.name).toEqual(name);
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([UserGroupProviderService], (service: UserGroupProviderService) => {
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
    it('should resolve to the deleted item', async(inject([UserGroupProviderService], (service: UserGroupProviderService) => {
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

    it('should reject with server error', async(inject([UserGroupProviderService], (service: UserGroupProviderService) => {
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
    it('should default to start 0 and length of 10', async(inject([UserGroupProviderService], (service: UserGroupProviderService) => {
      service._getFrom()
        .then((reservations) => {
          expect(reservations.length).toEqual(USER_GROUPS.length > 10 ? 10 : USER_GROUPS.length);
        })
        .catch((error) => {
          fail(error);
        })
    })));

    it('should accept a length', async(inject([UserGroupProviderService], (service: UserGroupProviderService) => {
      service._getFrom(0, 5)
        .then((reservations) => {
          expect(reservations).toBeDefined();
          expect(Array.isArray(reservations)).toBeTruthy();
          expect(reservations.length).toEqual(USER_GROUPS.length > 5 ? 5 : USER_GROUPS.length);
        })
        .catch((error) => {
          fail(error);
        });
    })));
  });
});
