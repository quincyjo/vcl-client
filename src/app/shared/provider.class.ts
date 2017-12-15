  import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs';
import { Idable } from './idable.interface';
import { Response } from './response.class';
import { EventManagerService } from '../services/event-manager.service';

/**
 * An abstract provider for data via a remote data source. Handles local caching
 * and validation while exposing basic CRUD operations along with asynchronous
 * iteration of the remote data. Event streams are also present to allow event
 * driven interaction with data change. Furthermore, the locally available data
 * can be accessed in both streamable and static forms.
 */
export abstract class Provider<T extends Idable> implements AsyncIterable<T> {
  /** Internal array structure for the stored data. **/
  private _data: Array<T>

  /** Internal !'hasNext' for the remote data source. **/
  private _done: boolean;

  /** Stream that emits whenever the data is modified. **/
  public dataChange: BehaviorSubject<Array<T>>;

  /** Stream that emits whenever an item is created. **/
  public onCreate: BehaviorSubject<T>;

  /** Stream that emits whenever an item is updated. **/
  public onUpdate: BehaviorSubject<T>;

  /** Stream that emits whenever an item is deleted. **/
  public onDelete: BehaviorSubject<T>;

  /** The current value of the reservation data. **/
  get data(): Array<T> { return this.dataChange.value; }

  /** The number of data items currently stored by the Provider. */
  get length(): number { return this._data.length; }

  /**
   * True if the provider service still has more reservations to fetch.
   * @return {boolean} Boolean representing if more reservatinos can be fetched.
   */
  get hasNext(): boolean { return !this._done; }

  /**
   * Symbol to make the provider asynchronously iterable.
   * @return {AsyncIterator<T>} The iterator for the reservations.
   * NOTE: This does not work at present due to an issue with Typescript
   * generating invalid async javascript. Must be iterated manually using
   * the `asyncIterator` factory method.
   */
  [Symbol.asyncIterator](): AsyncIterator<T> {
    let cursor: number = -1;
    let service = this;
    const iterator: AsyncIterator<T> = {
      next(): Promise<IteratorResult<T>> {
        return new Promise((resolve, reject) => {
          // More currently held data to resolve
          cursor++;
          if (cursor < service._data.length - 1) {
            resolve({
              value: service._data[cursor],
              done: cursor >= (service._data.length - 1) && !service.hasNext
            });
          // Nearly through held data, but more to fetch, so fetch and resolve.
          } else if (service.hasNext) {
            service._getNextItems()
              .then((result) => {
                resolve({
                  value: service._data[cursor],
                  done: cursor >= (service._data.length - 1) && !service.hasNext
                });
              });
          // Should never be called, but incase goes over all data
          } else {
            resolve({
              value: undefined,
              done: true
            });
          }
        });
      }
    }
    return iterator;
  }

  /**
   * Manual method for creating an asyncIterator for the data stream. This is
   * exposed this way for manual async iteration due to typescript errors
   * resulting in invalid javascript generation.
   * @return {AsyncIterator<T>} An AsyncIterator for the data.
   */
  public asyncIterator: () => AsyncIterator<T> = this[Symbol.asyncIterator];

  constructor(
    private _eventManager: EventManagerService
  ) {
    this.dataChange = new BehaviorSubject<Array<T>>([]);
    this.onCreate = new BehaviorSubject<T>(undefined);
    this.onUpdate = new BehaviorSubject<T>(undefined);
    this.onDelete = new BehaviorSubject<T>(undefined);
    this._data = [];
  }

  // public get onCreate(): BehaviorSubject<T> | { next: (item: T) => void, subscribe: (cb: (item: T) => void) => Subscription } {
  //   if(this._onCreate) {
  //     return this._onCreate;
  //   } else {
  //     return {
  //       next: (item: T) => {
  //         this._onCreate = new BehaviorSubject<T>(item);
  //       },
  //       subscribe: (cb: (item: T) => void) => {
  //         this._onCreate = new BehaviorSubject<T>(undefined);
  //         return this._onCreate.subscribe(cb);
  //       }
  //     }
  //   }
  // }

  /**
   * Adds the given item. The promise resolves to the item on successfully
   * adding it to the remote data source, and will reject with an error if an
   * error occurs. In addition to resolving onto the new item on success, the
   * `dataChange` variable will fire with the new list of items.
   * @param  {T}          item The item to add.
   * @return {Promise<T>}      Promise of the item being added to the remote
   *                           data source.
   */
  public add(item: T): Promise<T> {
    let promise = new Promise<T>((resolve, reject) => {
      this._addItem(item)
        .then((result) => {
          let id: number = result.id;
          item.id = id;
          this._push(item);
          this.onCreate.next(item);
          resolve(item);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  }

  /**
   * Attempts to fetch the item with the given id from the remote data source.
   * Resolves to the item upon success and rejects with the error if one occurs.
   * conflicted with the previous local copy.
   * @param  {number}     id The id of the target item.
   * @return {Promise<T>}    Promise of the item to be fetched.
   */
  public get(id: number): Promise<T> {
    let promise = new Promise<T>((resolve, reject) => {
      this._getItem(id)
        .then((item) => {
          let index = this._data.findIndex((elem) => {
            return elem.id === item.id;
          });
          if (index !== -1) {
            let current: T = this._data[index]
            for (let key of Object.keys(item)) {
              if (item[key] !== current[key]) {
              this._data[index] = item;
              this._next();
              break;
              }
            }
          } else {
            this._push(item);
          }
          resolve(item);
        })
        .catch((error) => {
          this._handleError(error);
          reject(error);
        })
    });
    return promise;
  }

  /**
   * Updates an item. The given item should have an id. Resolves onto the new
   * version of the item upon success and rejects with the error of one occurs.
   * In addition, `dataChange` will emit one the new data is the udpate is
   * successful.
   * @param  {T}          item The item to update, with an id.
   * @return {Promise<T>}      Promise of the update.
   */
  public put(item: T): Promise<T> {
    let promise = new Promise<T>((resolve, reject) => {
      this._putItem(item)
        .then((result) => {
          this._push(result);
          this.onUpdate.next(item);
          resolve(item);
        })
        .catch((error) => {
          this._handleError(error);
          reject(error);
        });
    });
    return promise;
  }

  /**
   * Delets the given item. Resolves onto the deleted upon upon success and
   * rejects with the error if one occurs. In addition, `dataChange` fires with
   * the new data if the delete is successful.
   * @param  {T}          item The item to delete, with an id.
   * @return {Promise<T>}      Promise of the item being deleted.
   */
  public delete(item: T): Promise<T> {
    let promise = new Promise<T>((resolve, reject) => {
      this._deleteItem(item)
        .then((result) => {
          let index = this._data.findIndex((elem) => {
            return elem.id === item.id;
          });
          if (index !== -1) {
            this._data.splice(index, 1);
            this._next();
          }
          this.onDelete.next(item);
          resolve(item);
        })
        .catch((error) => {
          this._handleError(error);
          reject(error);
        });
    });
    return promise;
  }

  /**
   * Requests the provider to get some more data from the remote source. Use
   * cases include lazy loading lists and the like. The work is done as a
   * promise which reoslves to `hasNext` upon success, or rejects with the error
   * if one occurs.
   * @return {Promise<any>} Promise of the items being fetched.
   */
  public next(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (!this._done) {
        this._getNextItems(this._data.length)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          this._handleError(error);
          reject(error);
        });
      } else {
        resolve(false);
      }
    });
    return promise;
  }

  /**
   * Fetches the next items from the remote data source. By default starts at
   * the index equal to the length of `_data` and requests 10 new items.
   * @param  {number        = this._data.length} start  The starting index.
   * @param  {number        = 10}                length Number of items.
   * @return {Promise<boolean>}   Promise of the items being added that resolves
   *                                      to `hasNext`.
   */
  private _getNextItems(start: number = this._data.length, length: number = 10): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, reject) => {
      this._getFrom(start, length)
        .then((items) => {
          if (items.length < length) {
            this._done = true;
          }
          if (!Array.isArray(items)) {
            items = [items];
          }
          for(const item of items) {
            this._push(item);
          }
          resolve(this.hasNext);
        })
        .catch((error) => {
          this._handleError(error);
          reject(error);
        });
    });
    return promise;
  }

  /**
   * Pushes the given item into the internal data array. Will update if the
   * `id` of the `item` already exists in the list. Emits the 'next' event of
   * `dataChange` with the new list.
   * @param  {T}   item The item to push.
   */
  private _push(item: T): void {
    let index: number = this._data.findIndex((elem) => {
      return elem.id === item.id;
    });
    if (index === -1) {
      this._data.push(item);
    }  else {
      this._data[index] = item;
    }
    this._next();
  }

  /**
   * Preforms a shallow copy of this internal data array and emits the 'next'
   * event on the `dataChange` Observable.
   */
  private _next(): void {
    const COPIED_DATA = this._data.slice();
    this.dataChange.next(COPIED_DATA);
  }

  /**
   * Handler for handling error returns from the remote services of Concrete
   * providers.
   * @param {Error} error The error to handle.
   */
  private _handleError(error: Error): void {
    this._eventManager.fire('error', error);
  }

  /**
   * Should add the item to the remote data source. The work should be returned
   * as a promise which resolves to the success response with the id of the new
   * resource upon success, or rejects with the server error if one occurs.
   * @param  {T}            item The item to be added.
   * @return {Promise<Response>} Promise of the item being added to the remote
   *                                     data source.
   */
  abstract _addItem(item: T): Promise<Response>;

  /**
   * Should get the requested item by id form the remote data source. The work
   * should be done as promise that resolves to the fetched item upon success,
   * or rejects with the server error if one occurs.
   * @param  {number}     id The target id of the item to fetch.
   * @return {Promise<T>}    Promise of the item.
   */
  abstract _getItem(id: number): Promise<T>;

  /**
   * Updates the remote data source with the give item. The work should be done
   * as a promise that resolves to the new item upon success, or throws the
   * server error if one occurs.
   * @param  {T}          item The updated item with id.
   * @return {Promise<T>}      Promise of the item being updated at the remote
   *                           data source.
   */
  abstract _putItem(item: T): Promise<T>;

  /**
   * Deletes the given item from the remote data source. The work should be done
   * as a promise that resolves to the deleted item upon success, or throws the
   * server error if one occurs.
   * @param  {T}            item The item to be deleted, with an id.
   * @return {Promise<T>}        Promise of the item being deleted.
   */
  abstract _deleteItem(item: T): Promise<T>;

  /**
   * Gets a range of items from the remote data source. The work should be done
   * as a promise that resolves to an array of the items in the range, starting
   * from `start` and including up `length` number of items. It should reject
   * with the error of one occurs .
   * @param  {number}  start  The starting index of the section.
   * @param  {number}  length The numberof items to retrieve if possible.
   * @return {Promise}        Promise of the selection of items.
   */
  abstract _getFrom(start: number, length: number): Promise<Array<T>>;
}
