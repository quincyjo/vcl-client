import { TestBed, inject, async } from '@angular/core/testing';

import { ArrayModel, MockBackendService, RESERVATIONS, IMAGES } from './mock-backend.service';
import { Error, Success } from '../shared/response.class';
import { Reservation } from '../shared/reservation.class';
import { Image } from '../shared/image.class';
import { HttpParams } from '@angular/common/http';

describe('MockBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockBackendService]
    });
  });

  it('should be created', inject([MockBackendService], (service: MockBackendService) => {
    expect(service).toBeTruthy();
  }));

  describe('#get', () => {
    it('it should get reservations', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations';
      service.get<Array<Reservation>>(url)
        .subscribe(
          (result) => {
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBeTruthy();
            expect(result.length).toEqual(RESERVATIONS.length);
          },
          (error) => {
            fail(error);
          });
    })));

    it('it should get images', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/images';
      service.get<Array<Reservation>>(url)
        .subscribe(
          (result) => {
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBeTruthy();
            expect(result.length).toEqual(IMAGES.length);
          },
          (error) => {
            fail(error);
          });
    })));

    it('it should get a reservation', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations/0';
      service.get<Reservation>(url)
        .subscribe(
          (result) => {
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result.id).toEqual(0);
          },
          (error) => {
            fail(error);
          }
        )
    })));

    it('it should get an image', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/images/0';
      service.get<Reservation>(url)
        .subscribe(
          (result) => {
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result.id).toEqual(0);
          },
          (error) => {
            fail(error);
          }
        )
    })));

    it('should accept a descriptor', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations';
      let descriptor = {
        name: 'Reservation0'
      };
      service.get<Array<Reservation>>(url, {
        params: new HttpParams().set('descriptor', JSON.stringify(descriptor))
      })
        .subscribe(
          (results) => {
            expect(results).toBeDefined();
            expect(Array.isArray(results)).toBeTruthy();
            for (let result of results) {
              expect(result.name).toEqual(descriptor.name);
            }
          },
          (error) => {
            fail('threw an observable error unexpectedly');
          });
    })));

    it('should return an empty array if no reservations matched descriptor', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations';
      let descriptor = {
        name: 'There is no reservation with this title, right?'
      };
      service.get<Array<Reservation>>(url, {
        params: new HttpParams().set('descriptor', JSON.stringify(descriptor))
      })
        .subscribe(
          (results) => {
            expect(results).toBeDefined();
            expect(Array.isArray(results)).toBeTruthy();
            expect(results.length).toEqual(0);
          },
          (error) => {
            fail('threw an observable error unexpectedly');
          });
    })));

    it('should accept a starting index with default length 10', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations';
      let start: number = 9;
      service.get<Array<Reservation>>(url, {
        params: new HttpParams().set('start', start.toString())
      })
        .subscribe(
          (results) => {
            expect(results).toBeDefined();
            expect(Array.isArray(results)).toBeTruthy();
            expect(results.length).toEqual(10);
            expect(results[0].name).toEqual(RESERVATIONS[start].name);
            expect(new Date(results[0].start)).toEqual(RESERVATIONS[start].start);
            expect(new Date(results[0].end)).toEqual(RESERVATIONS[start].end);
          },
          (error) => {
            fail(error);
          });
      url = '/api/images';
      start = 0;
      service.get<Array<Reservation>>(url, {
        params: new HttpParams().set('start', start.toString())
      })
        .subscribe(
          (results) => {
            expect(results).toBeDefined();
            expect(Array.isArray(results)).toBeTruthy();
            expect(results.length).toEqual(IMAGES.length < 10 ? IMAGES.length : 10);
            expect(results[0].name).toEqual(IMAGES[start].name);
          },
          (error) => {
            fail(error);
          });
    })));

    it('should accept a starting index and a length', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations';
      let start: number = 9;
      let length: number = 5;
      service.get<Array<Reservation>>(url, {
        params: new HttpParams()
          .set('start', start.toString())
          .set('length', length.toString())
      })
        .subscribe(
          (results) => {
            expect(results).toBeDefined();
            expect(Array.isArray(results)).toBeTruthy();
            expect(results.length).toEqual(length);
            expect(results[0].name).toEqual(RESERVATIONS[start].name);
            expect(new Date(results[0].start)).toEqual(RESERVATIONS[start].start);
            expect(new Date(results[0].end)).toEqual(RESERVATIONS[start].end);
            let lastResult: Reservation;
            for(let result of results) {
              if (lastResult) {
                expect(result.id).toEqual(lastResult.id + 1);
              }
              lastResult = result;
            }
          },
          (error) => {
            fail(error);
          });
    })));

    it('should accpet a single orderedBy string', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations';
      let orderBy = 'end';
      service.get<Array<Reservation>>(url, {
        params: new HttpParams()
                  .set('orderBy', orderBy)
      })
      .subscribe(
        (result) => {
          for (let i = 0; i < result.length; i++) {
            for (let j = i; j < result.length; j++) {
              expect(result[i][orderBy]).toBeLessThanOrEqual(result[j][orderBy]);
            }
          }
        },
        (error) => {
          fail(error);
        });
    })));

    it('should accpet an array to order by', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations';
      let orderBy = ['name', 'start', 'id'];
      service.get<Array<Reservation>>(url, {
        params: new HttpParams()
                  .set('orderBy', JSON.stringify(orderBy))
      })
      .subscribe(
        (result) => {
          for (let i = 0; i < result.length; i++) {
            for (let j = i; j < result.length; j++) {
              for (let key of orderBy) {
                expect(result[i][key]).toBeLessThanOrEqual(result[j][key]);
                if (result[i][key] < result[j][key]) {
                  break;
                }
              }
            }
          }
        },
        (error) => {
          fail(error);
        });
    })));

    it('it should throw a 404 no reservation was found', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations/4200';
      service.get<any>(url)
        .subscribe(
          (result) => {
            fail('Got result on expected 404: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(404);
          });
    })));

    it('it should throw a 404 if not an API endpoint', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/not/a/valid/endpoint';
      service.get<any>(url)
        .subscribe(
          (result) => {
            fail('Got result on expected 404: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(404);
          });
    })));

    it('it should throw a 400 if not a valid API endpoint', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/asdf';
      service.get<any>(url)
        .subscribe(
          (result) => {
            fail('Got result on expected 400: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(400);
          });
    })));
  });

  describe('#post', () => {
    it('it should add a reservation', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations';
      let newReservation: Reservation = new Reservation('A new reservation', new Date(), new Date());
      service.post<Success>(url, newReservation)
        .subscribe(
          (result) => {
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result.code).toEqual(201);
            expect(service['_reservations'].length).toEqual(RESERVATIONS.length + 1);
            expect(typeof result['id']).toEqual('number');
          },
          (error) => {
            fail(error);
          });
    })));

    it('it should add an image', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/images';
      let newImage: Image = new Image('A new image');
      service.post<Success>(url, newImage)
        .subscribe(
          (result) => {
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result.code).toEqual(201);
            expect(service['_images'].length).toEqual(IMAGES.length + 1);
            expect(typeof result['id']).toEqual('number');
          },
          (error) => {
            fail(error);
          });
    })));


    it('it should throw a 405 if not reservation is given', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations';
      service.post(url, null)
        .subscribe(
          (result) => {
            fail('Got result on expected 405: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(405);
          });
    })));

    it('it should throw a 404 if not an API endpoint', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/not/a/valid/endpoint';
      service.post<any>(url, null)
        .subscribe(
          (result) => {
            fail('Got result on expected 404: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(404);
          });
    })));

    it('it should throw a 400 if not a valid API endpoint', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/asdf';
      service.post<any>(url, null)
        .subscribe(
          (result) => {
            fail('Got result on expected 400: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(400);
          });
    })));
  });

  describe('#put', () => {
    it('it should update a reservation', async(inject([MockBackendService], (service: MockBackendService) => {
      let id: number = 0;
      let url: string = '/api/reservations/' + id;
      let newReservation: Reservation = new Reservation('A edited reservation', new Date(), new Date());
      service.put<Success>(url, newReservation)
        .subscribe(
          (result) => {
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result.code).toEqual(201);
            service.get<Reservation>(url)
              .subscribe(
                (result) => {
                  expect(result).toBeDefined();
                  expect(result.name).toEqual(newReservation.name);
                  expect(new Date(result.start)).toEqual(newReservation.start);
                  expect(new Date(result.end)).toEqual(newReservation.end);
                },
                (error) => {
                  fail(error);
                });
          },
          (error) => {
            fail(error);
          }
        )
    })));

    it('it should update an image', async(inject([MockBackendService], (service: MockBackendService) => {
      let id: number = 0;
      let url: string = '/api/images/' + id;
      let newImage: Image = new Image('An edited image');
      service.put<Success>(url, newImage)
        .subscribe(
          (result) => {
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result.code).toEqual(201);
            service.get<Reservation>(url)
              .subscribe(
                (result) => {
                  expect(result).toBeDefined();
                  expect(result.name).toEqual(newImage.name);
                },
                (error) => {
                  fail(error);
                });
          },
          (error) => {
            fail(error);
          }
        )
    })));

    it('it should throw a 404 no reservation was found', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations/4200';
      let newReservation: Reservation = new Reservation('A edited reservation', new Date(), new Date());
      service.put<any>(url, newReservation)
        .subscribe(
          (result) => {
            fail('Got result on expected 404: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(404);
          });
    })));

    it('it should throw a 404 no image was found', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/images/4200';
      let newImage: Image = new Image('A edited reservation');
      service.put<any>(url, newImage)
        .subscribe(
          (result) => {
            fail('Got result on expected 404: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(404);
          });
    })));

    it('it should throw a 405 if not reservation is given', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations';
      service.put(url, null)
        .subscribe(
          (result) => {
            fail('Got result on expected 405: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(405);
          });
    })));

    it('it should throw a 405 if not image is given', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/images';
      service.put(url, null)
        .subscribe(
          (result) => {
            fail('Got result on expected 405: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(405);
          });
    })));

    it('it should throw a 404 if not an API endpoint', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/not/a/valid/endpoint';
      service.put<any>(url, null)
        .subscribe(
          (result) => {
            fail('Got result on expected 404: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(404);
          });
    })));

    it('it should throw a 400 if not a valid API endpoint', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/asdf';
      service.put<any>(url, null)
        .subscribe(
          (result) => {
            fail('Got result on expected 400: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(400);
          });
    })));
  });

  describe('#delete', () => {
    it('it should delete a reservation', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations/0';
      service.delete<Success>(url)
        .subscribe(
          (result) => {
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result.code).toEqual(204);
            expect(service['_reservations'].length).toEqual(RESERVATIONS.length - 1);
          },
          (error) => {
            fail(error);
          }
        )
    })));

    it('it should delete an image', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/images/0';
      service.delete<Success>(url)
        .subscribe(
          (result) => {
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result.code).toEqual(204);
            expect(service['_images'].length).toEqual(IMAGES.length - 1);
          },
          (error) => {
            fail(error);
          }
        )
    })));

    it('it should throw a 404 no reservation was found', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations/4200';
      service.delete<any>(url)
        .subscribe(
          (result) => {
            fail('Got result on expected 404: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(404);
          });
    })));

    it('it should throw a 404 no image was found', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/images/4200';
      service.delete<any>(url)
        .subscribe(
          (result) => {
            fail('Got result on expected 404: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(404);
          });
    })));

    it('it should throw a 405 if not reservation is given', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/reservations';
      service.delete<any>(url)
        .subscribe(
          (result) => {
            fail('Got result on expected 405: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(405);
          });
    })));

    it('it should throw a 405 if not image is given', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/images';
      service.delete<any>(url)
        .subscribe(
          (result) => {
            fail('Got result on expected 405: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(405);
          });
    })));

    it('it should throw a 404 if not an API endpoint', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/not/a/valid/endpoint';
      service.delete<any>(url)
        .subscribe(
          (result) => {
            fail('Got result on expected 404: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(404);
          });
    })));

    it('it should throw a 400 if not a valid API endpoint', async(inject([MockBackendService], (service: MockBackendService) => {
      let url: string = '/api/asdf';
      service.delete<any>(url)
        .subscribe(
          (result) => {
            fail('Got result on expected 400: ' + result);
          },
          (error) => {
            expect(error).toBeDefined();
            expect(error.code).toEqual(400);
          });
    })));
  });

  describe('#_parseUrl', () => {
    it('should parse a proper relative URL', inject([MockBackendService], (service: MockBackendService) => {
      let url = 'a/proper/url/looks/like/this';
      let target = ['a','proper','url','looks','like','this'];
      let parsed = service['_parseUrl'](url);
      let i: number;
      for (i = 0; i < parsed.length && i < target.length; i++) {
        expect(parsed[i]).toEqual(target[i]);
      }
      expect(i).toEqual(target.length);
      expect(i).toEqual(parsed.length);
    }));

    it('should handle a leading \'/\'', inject([MockBackendService], (service: MockBackendService) => {
      let url = '/a/proper/url/looks/like/this';
      let target = ['a','proper','url','looks','like','this'];
      let parsed = service['_parseUrl'](url);
      let i: number;
      for (i = 0; i < parsed.length && i < target.length; i++) {
        expect(parsed[i]).toEqual(target[i]);
      }
      expect(i).toEqual(target.length);
      expect(i).toEqual(parsed.length);
    }));

    it('should handle a trailing \'/\'', inject([MockBackendService], (service: MockBackendService) => {
      let url = 'a/proper/url/looks/like/this/';
      let target = ['a','proper','url','looks','like','this'];
      let parsed = service['_parseUrl'](url);
      let i: number;
      for (i = 0; i < parsed.length && i < target.length; i++) {
        expect(parsed[i]).toEqual(target[i]);
      }
      expect(i).toEqual(target.length);
      expect(i).toEqual(parsed.length);
    }));

    it('should parse integers and numbers', inject([MockBackendService], (service: MockBackendService) => {
      let url = '0/1/2/3';
      let target = [0, 1, 2, 3];
      let parsed = service['_parseUrl'](url);
      let i: number;
      for (i = 0; i < parsed.length && i < target.length; i++) {
        expect(typeof parsed[i]).toEqual('number');
        expect(parsed[i]).toEqual(target[i]);
      }
      expect(i).toEqual(target.length);
      expect(i).toEqual(parsed.length);
    }));

    it('should enforce lower case lettering for all non numbers', inject([MockBackendService], (service: MockBackendService) => {
        let url = 'A/pRoPeR/UrL/LOOKS/like/thIs/';
        let target = ['a','proper','url','looks','like','this'];
        let parsed = service['_parseUrl'](url);
        let i: number;
        for (i = 0; i < parsed.length && i < target.length; i++) {
          expect(parsed[i]).toEqual(target[i]);
        }
        expect(i).toEqual(target.length);
        expect(i).toEqual(parsed.length);
    }));
  });
});

describe('ArrayModel', () => {
  let model: ArrayModel<any>;

  beforeEach(() => {
    model = new ArrayModel();
  });

  it('should add an item', () => {
    let newItem = {
      name: 'A new item!'
    }
    let itemId: number = model.add(newItem);
    expect(model.data.length).toEqual(1);
    let addedItem = model.data[0];
    expect(addedItem.name).toEqual(newItem.name);
    expect(addedItem.id).toEqual(itemId);
  });

  it('should update an item', () => {
    let id: number = model.add({
      name: 'An item!'
    });
    let update = {
      id: id,
      name: 'A different name!'
    };
    let updated: boolean = model.put(update);
    expect(updated).toBeTruthy();
    let updatedItem = model.data[0];
    expect(model.length).toEqual(1);
    expect(updatedItem.id).toEqual(id);
    expect(updatedItem.name).toEqual(update.name);
  });

  it('should not update without an id', () => {
    let id: number = model.add({
      name: 'An item!'
    });
    let update = {
      name: 'A different name!'
    };
    let updated: boolean = model.put(update);
    expect(updated).toBeFalsy();
    let updatedItem = model.data[0];
    expect(model.length).toEqual(1);
    expect(updatedItem.id).toEqual(id);
    expect(updatedItem.name).toEqual('An item!');
  });

  it('should delete an item', () => {
    let id: number = model.add({
      name: 'An item!'
    });
    let deleted: boolean = model.delete(id);
    expect(deleted).toBeTruthy();
    expect(model.length).toEqual(0);
  });
});
