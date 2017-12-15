import { Injectable } from '@angular/core';
import { Computer } from '../shared/computer.class';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MockBackendService } from './mock-backend.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Provider } from '../shared/provider.class';
import { Response } from '../shared/response.class';
import { EventManagerService } from '../services/event-manager.service';
import { CONFIG } from '../shared/config';

/**
 * Concrete provider implementation of Provider for computers.
 */
@Injectable()
export class ComputerProviderService extends Provider<Computer> {
  /** API endpoint for computers. **/
  private computersEndpoint: string = CONFIG.API_ROOT + '/computers';

  constructor(
    private _http: HttpClient,
    eventManager: EventManagerService,
  ) {
    super(eventManager);
    this.computersEndpoint = CONFIG.API_ROOT + '/computers';
  }

  /**
   * Attempts to add a computer to the server. The work is done as a promise
   * which will resolve to the added computer on success, or reject with the
   * server error if one occurs.
   * @param  {Computer}             item The computer to add.
   * @return {Promise<Response>}      Promise of the computer being added.
   */
  _addItem(item: Computer): Promise<Response> {
    let promise = new Promise<Response>((resolve, reject) => {
      this._http.post<Response>(this.computersEndpoint, item)
        .subscribe(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }

  /**
   * Attempts to get a computer from the server. The work is done as a
   * promise which will resolve to the requested computer on success, or
   * reject with the server error if one occurs.
   * @param  {number}         id Id of the target computer.
   * @return {Promise<Computer>}    Promise of the computer.
   */
  _getItem(id: number): Promise<Computer> {
    let promise = new Promise<Computer>((resolve, reject) => {
      let url = this.computersEndpoint + '/' + id;
      this._http.get<Computer>(url)
        .subscribe(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }

  /**
   * Attempts to update a computer on the server with the given one. The work
   * is done as a promise which will resolve to the new version of the
   * computer on success, or reject with the server error if one occurs.
   * @param  {Computer}          item The new version of an computer with
   *                                     id.
   * @return {Promise<Computer>}      Promise of the computer being
   *                                     updated.
   */
  _putItem(item: Computer): Promise<Computer> {
    let promise = new Promise<Computer>((resolve, reject) => {
      let url = this.computersEndpoint + '/' + item.id;
      this._http.put<Response>(url, item)
        .subscribe(
          (result) => {
            resolve(item);
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }

  /**
   * Attempts to delete the given computer from the server. The work is done
   * as a promise which will resolve to the deleted computer upon on success,
   * or reject with the server error if one occurs .
   * @param  {Computer}          item The target computer to delete.
   * @return {Promise<Computer>}      Promise of the computer being
   *                                     deleted.
   */
  _deleteItem(item: Computer): Promise<Computer> {
    let promise = new Promise<any>((resolve, reject) => {
      let url = this.computersEndpoint + '/' + item.id;
      this._http.delete<Response>(url)
        .subscribe(
          (result) => {
            resolve(item);
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }

  /**
   * Attempts to get a subsection of computer from the server, from `start`
   * with length of `length`. The work is done as a promise which will resolve
   * to an array of the computer on success, or reject with the server error
   * if one occurs.
   * @param  {number = 0}           start  The starting index.
   * @param  {number = 10}          length The number of computer to fetch.
   * @return {Promise}     Promise of the array of requested computer.
   */
  _getFrom(start: number = 0, length: number = 10): Promise<Array<Computer>> {
    let promise = new Promise<Array<Computer>>((resolve, reject) => {
      this._http.get<Array<Computer>>(this.computersEndpoint, {
        params: new HttpParams()
          .set('start', start.toString())
          .set('length', length.toString())
      })
        .subscribe(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }
}
