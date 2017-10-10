import { async } from '@angular/core/testing';
import { Provider } from './provider.class';
import { Idable } from './idable.interface';
import { Response } from './response.class';

describe('Provider', () => {
  let provider: Provider<Item>;

  beforeEach(() => {
    provider = new ItemProvider();
  });

  it('should add an item', async(() => {
    let newItem: Item = new Item('value');
    provider.add(newItem)
      .then((result) => {
        expect(provider.length).toEqual(1);
        expect(result.value).toEqual('value');
        expect(result.id).toBeDefined();
        expect(typeof result.id).toEqual('number');
      })
      .catch((error) => {
        fail(error);
      });
  }));

  it('should get an item', async(() => {
    provider.get(0)
      .then((result) => {
        expect(result).toBeDefined();
        expect(result.value).toEqual(ITEMS[0].value);
        expect(result.id).toBe(0);
      })
      .catch((error) => {
        fail(error);
      });
  }));

  it('should put an item', async(() => {
    let updatedItem = new Item('a new value');
    updatedItem.id = 0;
    provider.put(updatedItem)
      .then((result) => {
        provider.get(0)
          .then((result) => {
            expect(provider.length).toBe(1);
            expect(result).toBeDefined();
            expect(result.value).toEqual(updatedItem.value);
            expect(result.id).toBe(0);
          })
          .catch((error) => {
            fail(error);
          })
      })
      .catch((error) => {
        fail(error);
      });
  }));

  it('should delete an item', async(() => {
    let target = ITEMS[0];
    provider.delete(target)
      .then((result) => {
        expect(result.value).toEqual(target.value);
        expect(result.id).toBe(0);
      })
      .catch((error) => {
        fail(error);
      });
  }));

  describe('#next', () => {
    it('should get more and resolve to true if more', async(() => {
      let startingLength: number = provider.data.length;
      provider.next()
      .then((result) => {
        expect(result).toBeTruthy();
        expect(provider.data.length).toBeGreaterThan(startingLength);
      })
      .catch((error) => {
        fail(error);
      });
    }));

    it('should resolve to false upon completion', async(() => {
      let step = () => {
        let startingLength: number = provider.data.length;
        provider.next()
        .then((result) => {
          if(result) {
            expect(provider.data.length).toBeGreaterThan(startingLength);
            step();
          } else {
            expect(provider.data.length).toEqual(startingLength);
          }
        })
        .catch((error) => {
          fail(error);
        });
      };
      step();
    }));
  });

  describe('event streams', () => {
    it('should have an onCreate stream', async(() => {
      let createdItem: Item;
      provider.onCreate.subscribe((item) => {
        createdItem = item;
      });
      provider.add(new Item('a new item!'))
        .then((item) => {
          expect(createdItem).toBeDefined();
          expect(createdItem.value).toEqual('a new item!');
          expect(createdItem.id).toBeDefined();
        })
        .catch((error) => {
          fail(error);
        })
    }));

    it('should have an onUpdate stream', async(() => {
      let updatedItem: Item;
      provider.onUpdate.subscribe((item) => {
        updatedItem = item;
      });
      let update = new Item('a different value!');
      update.id = 0;
      provider.put(update)
        .then((item) => {
          expect(updatedItem).toBeDefined();
          expect(updatedItem.value).toEqual(update.value);
          expect(updatedItem.id).toEqual(update.id);
        })
        .catch((error) => {
          fail(error);
        });
    }));

    it('should have an onDelete stream', async(() => {
      let deletedItem: Item;
      provider.onDelete.subscribe((item) => {
        deletedItem = item;
      });
      provider.get(0)
        .then((item) => {
          provider.delete(item)
            .then((item) => {
              expect(deletedItem).toBeDefined();
              expect(deletedItem.value).toEqual(item.value);
              expect(deletedItem.id).toEqual(item.id);
            })
            .catch((error) => {
              fail(error);
            });
        })
        .catch((error) => {
          fail(error);
        });
    }));
  });

  describe('iteration', () => {
    it('should have async iteration', async(() => {
      let iterator: AsyncIterator<Item> = provider.asyncIterator();
      let count = 0;
      let step = () => {
        iterator.next()
          .then((result) => {
            expect(result.done).toBeDefined();
            expect(result.value).toBeDefined();
            expect(result.value).toBe(ITEMS[count]);
            count++;
            if (!result.done) {
              step();
            } else {
              // Only executes after iteration is complete.
              // Check that all data has been iterated over.
              expect(count).toEqual(ITEMS.length);
            }
          })
          .catch((error) => {
            fail(error);
          });
      };
      step();
    }));
  });
});

/**
 * Mock data item object.
 */
class Item {
  public id: number;

  constructor(public value: string) { }
}

/**
 * Mock remote data source. It is synchronous in this case, wrapped to async in
 * the provider.
 */
class MockRemoteDataSource<T extends Idable> {
  private _items: Array<T>;
  private _runningId: number;

  constructor(data?: Array<T>) {
    this._items = [];
    this._runningId = 0;
    if (data) {
      for (let item of data) {
        this.add(item);
      }
    }
  }

  public add(item: T): Response {
    item.id = this._runningId++;
    this._items.push(item);
    return {
      id: item.id,
      code: 201,
    };
  }

  public get(id: number): T {
    return this._items.find((elem) => {
      return elem.id === id;
    });
  }

  public getRange(start: number = 0, length: number = 10): Array<T> {
    return this._items.slice(start, start + length);
  }

  public put(item: T): T {
    let target: T = this._items.find((elem) => {
      return elem.id === item.id;
    });
    for (let key of Object.keys(item)) {
      target[key] = item[key];
    }
    return target;
  }

  public delete(item: T): T {
    let index: number = this._items.findIndex((elem) => {
      return elem.id === item.id;
    });
    if (index === -1) {
      return undefined;
    } else {
      this._items.splice(index, 1);
      return item;
    }
  }
}

/**
 * Simple provider for testing. Uses `Item` and `MockRemoteDataSource` for
 * testing purposes.
 */
class ItemProvider extends Provider<Item> {
  private remote: MockRemoteDataSource<Item>;

  constructor() {
    super();
    this.remote = new MockRemoteDataSource(ITEMS);
  }

  _addItem(item: Item): Promise<any> {
    let promise = new Promise<any>((resolve, reject) => {
      resolve(this.remote.add(item));
    });
    return promise;
  }

  _getItem(id: number): Promise<Item> {
    let promise = new Promise<Item>((resolve, reject) => {
      resolve(this.remote.get(id));
    });
    return promise;
  }

  _putItem(item: Item): Promise<Item> {
    let promise = new Promise<Item>((resolve, reject) => {
      resolve(this.remote.put(item));
    });
    return promise;
  }

  _deleteItem(item: Item): Promise<Item> {
    let promise = new Promise<Item>((resolve, reject) => {
      resolve(this.remote.delete(item))
    });
    return promise;
  }

  _getFrom(start: number = 0, length: number = 10): Promise<Array<Item>> {
    let promise = new Promise((resolve, reject) => {
      resolve(this.remote.getRange(start, length));
    });
    return promise;
  }
}

/**
 * Constant items for creating initial data state for testing.
 */
const ITEMS: Array<Item> = [
  new Item('First item'),
  new Item('Second item'),
  new Item('Third item'),
  new Item('Fourth item'),
  new Item('Fifth item'),
  new Item('Sixth item'),
  new Item('Seventh item'),
  new Item('Eighth item'),
  new Item('Ninth item'),
  new Item('Tenth item')
]
