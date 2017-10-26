import { Injectable } from '@angular/core';
import { Idable } from '../shared/idable.interface';
import { Reservation } from '../shared/reservation.class';
import { Image } from '../shared/image.class';
import { User } from '../shared/user.class';
import { ImageType } from '../shared/image-type.class';
import { OS } from '../shared/os.class';
import { UserGroup } from '../shared/user-group.class';
import { Platform } from '../shared/platform.class';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Response, Error, Success, CODE, CODE_MAP } from '../shared/response.class';

/**
 * Mock backend to be provided in place of HttpClient for independent testings
 * and development.
 */
@Injectable()
export class MockBackendService {
  /** Internal ArrayModel for stored reservations. **/
  private _reservations: ArrayModel<Reservation>;

  /** Internal ArrayModel for stored images. **/
  private _images: ArrayModel<Image>;

  /** Internal ArrayModel for stored users. **/
  private _users: ArrayModel<User>;

  /** Internal ArrayModel for stored image types. **/
  private _imagetypes: ArrayModel<ImageType>;

  /** Internal ArrayModel for stored platforms. **/
  private _platforms: ArrayModel<Platform>;

  /** Internal ArrayModel for stored platforms. **/
  private _oses: ArrayModel<OS>;

  /** Internal ArrayModel for user groups. **/
  private _userGroups: ArrayModel<UserGroup>;

  /** Maps an url to available endpoints. **/
  private urlMap: any;

  constructor() {
    this._reservations = new ArrayModel<Reservation>(RESERVATIONS);
    this._images = new ArrayModel<Image>(IMAGES);
    this._users = new ArrayModel<User>(USERS);
    this._imagetypes = new ArrayModel<ImageType>(IMAGE_TYPES);
    this._platforms = new ArrayModel<Platform>(PLATFORMS);
    this._oses = new ArrayModel<OS>(OSES);
    this._userGroups = new ArrayModel<UserGroup>(USER_GROUPS);
    this.urlMap = {
      'api': {
        'images': {
          GET: () => { },
          POST: () => { },
          ':id:number': {
            GET: () => { },
            PUT: () => { },
            DELETE: () => { }
          }
        },
        'reservations': {
          GET: () => { },
          POST: () => { },
          ':id:number': {
            GET: () => { },
            PUT: () => { },
            DELETE: () => { }
          }
        }
      }
    };
  }

  /**
   * Simulates an HTTP GET request and accepts api URLs.
   * @param  {string}          url     The target URL for the GET request.
   * @param  {RequestOptions}  options The options for the HTTP request.
   * @return {Observable<T>}         Observable of the HTTP response.
   */
  public get<T>(url: string, options?: RequestOptions): Observable<T> {
    // TODO: Parse url and do work
    let path: Array<string> = url.split('/');
    if (!path[0]) {
      path = path.slice(1);
    }
    if (path[0] === 'api') {
      if (path[1] === 'reservations') {
        if (path[2]) {
          let id = parseInt(path[2]);
          let target = this._reservations.get(id);
          if (target) {
            // Get the targeted reservation.
            return Observable.of(JSON.parse(JSON.stringify(target)));
          } else {
            // Target reservation did not exist.
            return Observable.throw(new Error(CODE.NOT_FOUND));
          }
        }
        // Get all reservations.
        else if(options && options.params) {
          let params: HttpParams = options.params as HttpParams;
          let processOptions: ProcessOptions = {
            descriptor: JSON.parse(params.get('descriptor')),
            start: parseInt(params.get('start')),
            length: parseInt(params.get('length')),
            orderBy: params.has('orderBy') && params.get('orderBy').charAt(0) === '[' ? JSON.parse(params.get('orderBy')) : params.get('orderBy')
          };
          let results: Array<Reservation> = this._processResults(this._reservations.data, processOptions);
          return Observable.of(JSON.parse(JSON.stringify(results)));
        } else {
          return Observable.of(JSON.parse(JSON.stringify(this._reservations.data)));
        }
      } else if (path[1] === 'images') {
        if (path[2]) {
            let id = parseInt(path[2]);
            if (!isNaN(id) && this._images.get(id)) {
              let image = this._images.get(id);
              image.owner = this._users.get(image.ownerId);
              image.type = this._imagetypes.get(image.typeId);
              image.platform = this._platforms.get(image.platformId);
              image.os = this._oses.get(image.OSId);
              return Observable.of(JSON.parse(JSON.stringify(image)));
            } else if (isNaN(id)){
              return Observable.throw(new Error(CODE.BAD_REQUEST));
            } else {
              return Observable.throw(new Error(CODE.NOT_FOUND));
            }
        } else if(options && options.params) {
          let params: HttpParams = options.params as HttpParams;
          let processOptions: ProcessOptions = {
            descriptor: JSON.parse(params.get('descriptor')),
            start: parseInt(params.get('start')),
            length: parseInt(params.get('length')),
            orderBy: params.has('orderBy') && params.get('orderBy').charAt(0) === '[' ? JSON.parse(params.get('orderBy')) : params.get('orderBy')
          };
          let results: Array<Image> = this._processResults(this._images.data, processOptions);
          results.map((image) => {
            image.owner = this._users.get(image.ownerId);
            image.type = this._imagetypes.get(image.typeId);
            image.platform = this._platforms.get(image.platformId);
            image.os = this._oses.get(image.OSId);
          });
          return Observable.of(JSON.parse(JSON.stringify(results)));
        } else {
          return Observable.of(JSON.parse(JSON.stringify(this._images.data)));
        }
      } else if (path[1] === 'usergroups') {
        if (path[2]) {
            let id = parseInt(path[2]);
            if (!isNaN(id) && this._userGroups.get(id)) {
              let group = this._userGroups.get(id);
              return Observable.of(JSON.parse(JSON.stringify(group)));
            } else if (isNaN(id)){
              return Observable.throw(new Error(CODE.BAD_REQUEST));
            } else {
              return Observable.throw(new Error(CODE.NOT_FOUND));
            }
        } else if(options && options.params) {
          let params: HttpParams = options.params as HttpParams;
          let processOptions: ProcessOptions = {
            descriptor: JSON.parse(params.get('descriptor')),
            start: parseInt(params.get('start')),
            length: parseInt(params.get('length')),
            orderBy: params.has('orderBy') && params.get('orderBy').charAt(0) === '[' ? JSON.parse(params.get('orderBy')) : params.get('orderBy')
          };
          let results: Array<UserGroup> = this._processResults(this._userGroups.data, processOptions);
          return Observable.of(JSON.parse(JSON.stringify(results)));
        } else {
          return Observable.of(JSON.parse(JSON.stringify(this._userGroups.data)));
        }
      } else {
        // Not a vliad API endpoint.
        return Observable.throw(new Error(CODE.BAD_REQUEST));
      }
    } else {
      // Not an API endpoint.
      return Observable.throw(new Error(CODE.NOT_FOUND));
    }
  }

  private _processResults<T>(data: Array<T>, options: ProcessOptions = {}): Array<T> {
    // Filter resullts basee on the descriptor.
    let results: Array<T>
      = options.descriptor
      ? data.filter((reservation) => {
          for (let key of Object.keys(options.descriptor)) {
            if (options.descriptor[key] !== reservation[key]) {
              return false;
            }
          }
          return true;
        })
      : data;
    // Flatten orderedBy into an array.
    let orderBy: Array<string>
      = typeof options.orderBy === 'string'
      ? [options.orderBy]
      : options.orderBy;
    // Sort the filtered results if ordered by is given.
    let ordered: Array<T>
      = options.orderBy
      ? results.sort((a, b) => {
          for (let key of orderBy) {
            if (a[key] < b[key]) return -1
            else if (a[key] > b[key]) return 1
          }
          return 0;
        })
      : results;
    // Slice results if a start was given
    let sliced = !isNaN(options.start)
               ? ordered.slice(options.start, options.start + (options.length || 10))
               : ordered;
    return sliced;
  }

  /**
   * Simulates an HTTP POST request and accepts api URLs.
   * @param  {string}          url     The target URL for the GET request.
   * @param  {any|null}        body    The body of the POST request.
   * @param  {RequestOptions}  options The options for the HTTP request.
   * @return {Observable<T>}         Observable of the HTTP response.
   */
  public post<T>(url: string, body: any|null, options?: RequestOptions): Observable<T|Success|Error> {
    let path: Array<string> = url.split('/');
    if (!path[0]) {
      path = path.slice(1);
    }
    if (path[0] === 'api') {
      if (path[1] === 'reservations'
        ||path[1] === 'usergroups'
        ||path[1] === 'images') {
        if (!body) {
          // Data object was not provided, invalid method call.
          return Observable.throw(new Error(CODE.NOT_ALLOWED));
        } else {
          if (path[1] === 'reservations') {
            let target: Reservation = body as Reservation;
            let model = this._reservations;
            return Observable.of(this._addToModel<Reservation>(model, target));
          } else if (path[1] === 'images') {
            let target: Image = body as Image;
            let model = this._images;
            return Observable.of(this._addToModel<Image>(model, target));
          } else if (path[1] === 'usergroups') {
            let target: UserGroup = body as UserGroup;
            let model = this._userGroups;
            return Observable.of(this._addToModel<UserGroup>(model, target));
          }
        }
      } else {
        // Not a vliad API endpoint.
        return Observable.throw(new Error(CODE.BAD_REQUEST));
      }
    } else {
      // Not an API endpoint.
      return Observable.throw(new Error(CODE.NOT_FOUND));
    }
  }

  /**
   * Adds an items to the given model and creates a Response object based on the
   * result of the attempted addition. Will always add as a new item and any
   * pre-existing id attribtue of the given item.
   * @param  {ArrayModel<T>} model The model too add the item to.
   * @param  {T}             item  The item to add to `model`.
   * @return {Response}      The Response object representing the result of the
   *                         addition of `item` to `model`.
   */
  private _addToModel<T extends Idable>(model: ArrayModel<T>, item: T): Success | Error {
    let id:number = model.add(item);
    let response = new Success(CODE.CREATED);
    response.id = id;
    return response;
  }

  /**
   * Simulates an HTTP PUT request and accepts api URLs.
   * @param  {string}          url     The target URL for the GET request.
   * @param  {any|null}        body    The body of the PUT request.
   * @param  {RequestOptions}  options The options for the HTTP request.
   * @return {Observable<T>}         Observable of the HTTP response.
   */
  public put<T>(url: string, body: any|null, options?: RequestOptions): Observable<T|Success|Error> {
    let path: Array<string> = url.split('/');
    if (!path[0]) {
      path = path.slice(1);
    }
    if (path[0] === 'api') {
      if (path[1] === 'reservations') {
        if (!body) {
          // Data object was not provided, invalid method call.
          return Observable.throw(new Error(CODE.NOT_ALLOWED));
        }
        if (path[2] && body) {
          let reservation = body as Reservation;
          reservation.id = parseInt(path[2]);
          if (this._reservations.put(reservation)) {
            // Target reservaiton was successfully updated.
            return Observable.of(new Success(CODE.CREATED));
          } else {
            // Target reservation was not found.
            return Observable.throw(new Error(CODE.NOT_FOUND));
          }
        } else {
          // Either reservation or target id was not provided.
          return Observable.throw(new Error(CODE.NOT_ALLOWED));
        }
      } else if (path[1] === 'images') {
        let image: Image = body as Image;
        if (!isNaN(parseInt(path[2])) && image) {
          image.id = parseInt(path[2]);
          if (this._images.put(image)) {
            // Target reservaiton was successfully updated.
            return Observable.of(new Success(CODE.CREATED));
          } else {
            // Target reservation was not found.
            return Observable.throw(new Error(CODE.NOT_FOUND));
          }
        } else {
          return Observable.throw(new Error(CODE.NOT_ALLOWED));
        }
      } else if (path[1] === 'usergroups') {
        let group: UserGroup = body as UserGroup;
        if (!isNaN(parseInt(path[2])) && group) {
          group.id = parseInt(path[2]);
          if (this._userGroups.put(group)) {
            // Target reservaiton was successfully updated.
            return Observable.of(new Success(CODE.CREATED));
          } else {
            // Target reservation was not found.
            return Observable.throw(new Error(CODE.NOT_FOUND));
          }
        } else {
          return Observable.throw(new Error(CODE.NOT_ALLOWED));
        }
      } else {
        // Not a vliad API endpoint.
        return Observable.throw(new Error(CODE.BAD_REQUEST));
      }
    } else {
      // Not an API endpoint.
      return Observable.throw(new Error(CODE.NOT_FOUND));
    }
  }

  /**
   * Simulates an HTTP DELETE request and accepts api URLs.
   * @param  {string}          url     The target URL for the GET request.
   * @param  {RequestOptions}  options The options for the HTTP request.
   * @return {Observable<T>}         Observable of the HTTP response.
   */
  public delete<T>(url: string, options?: RequestOptions): Observable<T|Error|Success> {
    let path: Array<string> = url.split('/');
    if (!path[0]) {
      path = path.slice(1);
    }
    if (path[0] === 'api') {
      if (path[1] === 'reservations') {
        if (path[2]) {
          let id: number = parseInt(path[2]);
          if (!isNaN(id) && this._reservations.delete(id)) {
            // Target reservation successfully deleted.
            return Observable.of(new Success(CODE.DELETED));
          } else {
            // Target reservation was not found.
            return Observable.throw(new Error(CODE.NOT_FOUND));
          }
        } else {
          // No idea was given, invalid method.
          return Observable.throw(new Error(CODE.NOT_ALLOWED));
        }
      } else if (path[1] === 'images') {
        if (path[2]) {
          let id: number = parseInt(path[2]);
          if (!isNaN(id) && this._images.delete(id)) {
            // Target reservation successfully deleted.
            return Observable.of(new Success(CODE.DELETED));
          } else {
            // Target reservation was not found.
            return Observable.throw(new Error(CODE.NOT_FOUND));
          }
        } else {
          return Observable.throw(new Error(CODE.NOT_ALLOWED));
        }
      } else if (path[1] === 'usergroups') {
        if (path[2]) {
          let id: number = parseInt(path[2]);
          if (!isNaN(id) && this._userGroups.delete(id)) {
            // Target reservation successfully deleted.
            return Observable.of(new Success(CODE.DELETED));
          } else {
            // Target reservation was not found.
            return Observable.throw(new Error(CODE.NOT_FOUND));
          }
        } else {
          return Observable.throw(new Error(CODE.NOT_ALLOWED));
        }
      } else {
        // Not a vliad API endpoint.
        return Observable.throw(new Error(CODE.BAD_REQUEST));
      }
    } else {
      // Not an API endpoint.
      return Observable.throw(new Error(CODE.NOT_FOUND));
    }
  }

  /**
   * Prases an URL string into an array for parsing the path. Strips opening and
   * closing '/'. Enforces lowercase strings.
   * @param  {string} url The string to clean.
   * @return {Array<string>}     [description]
   */
  private _parseUrl(url: string): Array<string|number> {
    const start: number = url.charAt(0) === '/'
                        ? 1
                        : 0;
    const end: number = url.charAt(url.length - 1) === '/'
                      ? url.length - 1
                      : url.length;
    return url
      .substr(start, end)
      .split('/')
      .map((elem) => {
        if (isNaN(parseInt(elem))) {
          return elem.toLowerCase();
        } else {
          return parseInt(elem);
        }
      });
  }
}

export class ArrayModel<T extends Idable> {
  /**  Running id for adding data **/
  private runningId: number;
  /** Internal array of items **/
  private items: Array<T>;

  /**
   * Accessor for a shllow copy of the data.
   * @return {Array<T>} The current data.
   */
  get data(): Array<T> {
    return this.items.slice();
  }

  /**
   * Accessor for the length of the data.
   * @return {number} The number of items.
   */
  get length(): number {
    return this.items.length;
  }

  /**
   * Constructs an ArrayModel of type T.
   * @param  {Array<T>} data Optional parameter that will initialize the model
   *                         with the items given in `data`.
   * @return {ArrayModel<T>}        The ArrayModel.
   */
  constructor(data?: Array<T>) {
    this.items = [];
    this.runningId = 0;
    if (data) {
      this.loadFromArray(data);
    }
  }

  /**
   * Adds all the items in `data` into the model.
   * @param  {Array<T>} data An array of items of type T.
   * @return {boolean}       True if successful, false if the operation could
   *                         not be complete, such as a non-array was given.
   */
  public loadFromArray(data: Array<T>): boolean {
    if (data && Array.isArray(data)) {
      for (const item of data) {
        this.add(item);
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Gets the item with the given id. Returns undefined if no item matched the
   * given id.
   * @param  {number} id The target `id` to search for.
   * @return {T}         The item matching `id`.
   */
  public get(id: number): T {
    return this._findItem(id);
  }

  /**
   * Adds an item to the model. Returns the assigned id for the new item. If an
   * id already existed on the item it will be overwritten.
   * @param  {T}      item The item to be added.
   * @return {number}      The id assigned to the new item.
   */
  public add(item: T): number {
    let copiedItem = JSON.parse(JSON.stringify(item));
    let id = this.runningId++;
    copiedItem.id = id;
    this.items.push(copiedItem);
    return id;
  }

  /**
   * Updates an existing item with the given on. It must have an id attribute.
   * Returns true if the update was successful, false if the item was not found .
   * @param  {T}       item The updated item.
   * @return {boolean}      Boolean telling if the update was successful.
   */
  public put(item: T): boolean {
    let index: number = this._findIndex(item);
    if (index !== -1) {
      let copiedItem = JSON.parse(JSON.stringify(item));
      this.items[index] = copiedItem;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Deletes the target item by object or id from the model. Returns true if
   * successful, false if the item was not matched.
   * @param  {T    | number}      id The target item or item id.
   * @return {boolean}   Boolean telling if the delete was successful.
   */
  public delete(id: T | number): boolean {
    let index: number = this._findIndex(id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Finds the index in `items` of the given identifier. Both an object of typeof
   * `T` or an id as a number can be given. -1 is returned if the item was not
   * found.
   * @param  {T   | number}      item The identifier for the target item.
   * @return {number}   The index of item if found.
   */
  private _findIndex(item: T | number): number {
    let id = typeof item === 'number'
           ? item
           : item['id'];
    return this.items.findIndex((elem) => {
      return elem['id'] === id;
    });
  }

  /**
   * Finds the item with the given id and returns it. `undefined` is returned if
   * if the item was not found.
   * @param  {number} id The id of the target item.
   * @return {T}         The item if it was found or `undefined`.
   */
  private _findItem(id: number): T {
    return this.items.find((elem) => {
      return elem['id'] === id;
    });
  }
}

/**
 * An type for the object given to `_processResults` to choose how results
 * are processed.
 */
export type ProcessOptions = {
  descriptor?: Object,
  start?: number,
  length?: number,
  orderBy?: string | Array<string>
}

/**
 * The possible reservation types.
 */
export type ReservationType = 'Basic Reservation'
                            | 'Imaging Reservation'
                            | 'Server Reservation';

/**
 * Type for the accepted possible request options, mocking HttpClient.
 */
export type RequestOptions = {
  params?: HttpParams
}

/** Constant reservations list for initially stored reservations. **/
export const RESERVATIONS: Array<Reservation> = [
  new Reservation('Reservation1', new Date(2017,8,15), new Date(2017,8,16)),
  new Reservation('Reservation2', new Date(2016,8,15), new Date(2016,9,1)),
  new Reservation('Reservation3', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation4', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation5', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation6', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation7', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation8', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation9', new Date(2017,7,15), new Date(2017,7,16)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21)),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21))
];

/** Constant images list for initially stored images. **/
export const IMAGES: Array<Image> = [
  new Image('An Image!'),
  new Image('Another Image!'),
  new Image('I am something Oracle...'),
  new Image('I run NodeJS like a baller!'),
  new Image('...I do something...'),
  new Image('Some linux thing or something\'...'),
  new Image('abc\'s'),
  new Image('An Image!'),
  new Image('An Image!'),
  new Image('An Image!'),
  new Image('An Image!'),
];

/** Constant users list for initially stored users. **/
export const USERS: Array<User> = [
  new User('vclverbetam@gmail.com', 'Robert', 'Compton', 'Robby'),
];

/** Constant image types list for initially stored image types. **/
export const IMAGE_TYPES: Array<ImageType> = [
  new ImageType('Educational')
];

/** Constant platforms list for initially stored platforms. **/
export const PLATFORMS: Array<Platform> = [
  new Platform('Something')
];

/** Constant OSes list for initially stored OSes. **/
export const OSES: Array<OS> = [
  new OS('windows_7', 'Windows 7', 'windows')
];

/** Constant UserGroups list for initially stored user groups. **/
export const USER_GROUPS: Array<UserGroup> = [
  new UserGroup('Admins')
];

/** Constant for supported reservation types. **/
export const RESERVATIONTYPES: Array<ReservationType> = [
  'Basic Reservation',
  'Imaging Reservation',
  'Server Reservation'
];

/*** Constant for supported reservaiton environments. **/
export const ENVIRONMENTS:  Array<string> = [
  'CentOS',
  'Linux Lab Machine',
  'Red Hat Enterprise Linux',
  'VCL Sandbox',
  'Windows 7 Base'
];

/** Possible HTTPMethod types. **/
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
