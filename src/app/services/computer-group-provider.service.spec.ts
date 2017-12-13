import { TestBed, inject, async } from '@angular/core/testing';

import { ComputerGroupProviderService } from './computer-group-provider.service';
import { MockBackendService } from './mock-backend.service';
import { HttpClient } from '@angular/common/http';
import { Response, Success, Error, CODE } from '../shared/response.class';
import { ComputerGroup } from '../shared/computer-group.class';

describe('ComputerGroupProviderService', () => {
  let mockBackendService: MockBackendService;
  beforeEach(() => {
    mockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      providers: [
        ComputerGroupProviderService,
        { provide: HttpClient, useValue: mockBackendService }
      ]
    });
  });

  it('should be created', inject([ComputerGroupProviderService], (service: ComputerGroupProviderService) => {
    expect(service).toBeTruthy();
  }));

  describe('#_addItem', () => {
    it('should resolve to the item', async(inject([ComputerGroupProviderService], (service: ComputerGroupProviderService) => {
      let newComputerGroup  = new ComputerGroup('A new computer group!');
      service._addItem(newComputerGroup)
        .then((result) => {
          expect(result.code).toEqual(CODE.CREATED);
          expect(result.id).toBeDefined();
          expect(isNaN(result.id)).toBeFalsy();
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ComputerGroupProviderService], (service: ComputerGroupProviderService) => {
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
    it('should resolve to the response', async(inject([ComputerGroupProviderService], (service: ComputerGroupProviderService) => {
      let targetId = 0;
      service._getItem(targetId)
        .then((group) => {
          expect(group).toBeDefined();
          expect(group.id).toEqual(targetId);
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ComputerGroupProviderService], (service: ComputerGroupProviderService) => {
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
    it('should resolve to the updated item', async(inject([ComputerGroupProviderService], (service: ComputerGroupProviderService) => {
      let start, end: Date = new Date();
      let name: string = 'A new name!'
      let updatedComputerGroup = new ComputerGroup(name);
      let id = 0;
      updatedComputerGroup.id = id;
      service._putItem(updatedComputerGroup)
        .then((group) => {
          expect(group).toBeDefined();
          expect(group.id).toEqual(id);
          expect(group.name).toEqual(name);
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ComputerGroupProviderService], (service: ComputerGroupProviderService) => {
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
    it('should resolve to the deleted item', async(inject([ComputerGroupProviderService], (service: ComputerGroupProviderService) => {
      service._getItem(0)
        .then((group) => {
          service._deleteItem(group)
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

    it('should reject with server error', async(inject([ComputerGroupProviderService], (service: ComputerGroupProviderService) => {
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
