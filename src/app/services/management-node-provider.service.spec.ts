import { TestBed, inject, async } from '@angular/core/testing';

import { ManagementNodeProviderService } from './management-node-provider.service';
import { MockBackendService } from './mock-backend.service';
import { HttpClient } from '@angular/common/http';
import { Response, Success, Error, CODE } from '../shared/response.class';
import { ManagementNode } from '../shared/management-node.class';

describe('ManagementNodeProviderService', () => {
  let mockBackendService: MockBackendService;
  beforeEach(() => {
    mockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      providers: [
        ManagementNodeProviderService,
        { provide: HttpClient, useValue: mockBackendService }
      ]
    });
  });

  it('should be created', inject([ManagementNodeProviderService], (service: ManagementNodeProviderService) => {
    expect(service).toBeTruthy();
  }));

  describe('#_addItem', () => {
    it('should resolve to the item', async(inject([ManagementNodeProviderService], (service: ManagementNodeProviderService) => {
      let newManagementNode  = new ManagementNode('A new node');
      service._addItem(newManagementNode)
        .then((result) => {
          expect(result.code).toEqual(CODE.CREATED);
          expect(result.id).toBeDefined();
          expect(isNaN(result.id)).toBeFalsy();
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ManagementNodeProviderService], (service: ManagementNodeProviderService) => {
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
    it('should resolve to the response', async(inject([ManagementNodeProviderService], (service: ManagementNodeProviderService) => {
      let targetId = 0;
      service._getItem(targetId)
        .then((node) => {
          expect(node).toBeDefined();
          expect(node.id).toEqual(targetId);
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ManagementNodeProviderService], (service: ManagementNodeProviderService) => {
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
    it('should resolve to the updated item', async(inject([ManagementNodeProviderService], (service: ManagementNodeProviderService) => {
      let start, end: Date = new Date();
      let hostname: string = 'A new name!'
      let updatedManagementNode = new ManagementNode(hostname);
      let id = 0;
      updatedManagementNode.id = id;
      service._putItem(updatedManagementNode)
        .then((node) => {
          expect(node).toBeDefined();
          expect(node.id).toEqual(id);
          expect(node.hostname).toEqual(hostname);
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ManagementNodeProviderService], (service: ManagementNodeProviderService) => {
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
    it('should resolve to the deleted item', async(inject([ManagementNodeProviderService], (service: ManagementNodeProviderService) => {
      service._getItem(0)
        .then((node) => {
          service._deleteItem(node)
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

    it('should reject with server error', async(inject([ManagementNodeProviderService], (service: ManagementNodeProviderService) => {
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
