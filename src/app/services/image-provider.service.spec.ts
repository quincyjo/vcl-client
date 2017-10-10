import { TestBed, inject, async } from '@angular/core/testing';

import { ImageProviderService } from './image-provider.service';
import { MockBackendService } from './mock-backend.service';
import { HttpClient } from '@angular/common/http';
import { Response, Success, Error, CODE } from '../shared/response.class';
import { Image } from '../shared/image.class';

describe('ImageProviderService', () => {
  let mockBackendService: MockBackendService;
  beforeEach(() => {
    mockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      providers: [
        ImageProviderService,
        { provide: HttpClient, useValue: mockBackendService }
      ]
    });
  });

  it('should be created', inject([ImageProviderService], (service: ImageProviderService) => {
    expect(service).toBeTruthy();
  }));

  describe('#_addItem', () => {
    it('should resolve to the item', async(inject([ImageProviderService], (service: ImageProviderService) => {
      let newImage  = new Image('A new image');
      service._addItem(newImage)
        .then((result) => {
          expect(result.code).toEqual(CODE.CREATED);
          expect(result.id).toBeDefined();
          expect(isNaN(result.id)).toBeFalsy();
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ImageProviderService], (service: ImageProviderService) => {
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
    it('should resolve to the response', async(inject([ImageProviderService], (service: ImageProviderService) => {
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

    it('should reject with server error', async(inject([ImageProviderService], (service: ImageProviderService) => {
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
    it('should resolve to the updated item', async(inject([ImageProviderService], (service: ImageProviderService) => {
      let start, end: Date = new Date();
      let name: string = 'A new name!'
      let updatedImage = new Image(name);
      let id = 0;
      updatedImage.id = id;
      service._putItem(updatedImage)
        .then((reservation) => {
          expect(reservation).toBeDefined();
          expect(reservation.id).toEqual(id);
          expect(reservation.name).toEqual(name);
        })
        .catch((error) => {
          fail(error);
        });
    })));

    it('should reject with server error', async(inject([ImageProviderService], (service: ImageProviderService) => {
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
    it('should resolve to the deleted item', async(inject([ImageProviderService], (service: ImageProviderService) => {
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

    it('should reject with server error', async(inject([ImageProviderService], (service: ImageProviderService) => {
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
    it('should default to start 0 and length of 10', async(inject([ImageProviderService], (service: ImageProviderService) => {
      service._getFrom()
        .then((reservations) => {
          expect(reservations.length).toEqual(10);
        })
        .catch((error) => {
          fail(error);
        })
    })));

    it('should accept a length', async(inject([ImageProviderService], (service: ImageProviderService) => {
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
