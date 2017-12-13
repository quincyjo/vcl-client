import { Injectable } from '@angular/core';
import { ComputerGroup } from '../shared/computer-group.class';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MockBackendService } from './mock-backend.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Provider } from '../shared/provider.class';
import { Response } from '../shared/response.class';

/**
 * Concrete provider implementation of Provider for computer groups.
 */
@Injectable()
export class ComputerGroupProviderService extends Provider<ComputerGroup> {
  /** API endpoint for computer groups. **/
  private computerGroupsEndpoint: string = '/api/computergroups';

  constructor(private _http: HttpClient) {
    super();
    this.computerGroupsEndpoint = '/api/computergroups';
  }

  /**
   * Attempts to add a computer group to the server. The work is done as a promise
   * which will resolve to the added computer group on success, or reject with the
   * server error if one occurs.
   * @param  {ComputerGroup}             item The computer group to add.
   * @return {Promise<Response>}      Promise of the computer group being added.
   */
  _addItem(item: ComputerGroup): Promise<Response> {
    let promise = new Promise<Response>((resolve, reject) => {
      this._http.post<Response>(this.computerGroupsEndpoint, item)
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
   * Attempts to get a computer group from the server. The work is done as a
   * promise which will resolve to the requested computer group on success, or
   * reject with the server error if one occurs.
   * @param  {number}         id Id of the target computer group.
   * @return {Promise<ComputerGroup>}    Promise of the computer group.
   */
  _getItem(id: number): Promise<ComputerGroup> {
    let promise = new Promise<ComputerGroup>((resolve, reject) => {
      let url = this.computerGroupsEndpoint + '/' + id;
      this._http.get<ComputerGroup>(url)
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
   * Attempts to update a computer group on the server with the given one. The work
   * is done as a promise which will resolve to the new version of the
   * computer group on success, or reject with the server error if one occurs.
   * @param  {ComputerGroup}          item The new version of an computer group with
   *                                     id.
   * @return {Promise<ComputerGroup>}      Promise of the computer group being
   *                                     updated.
   */
  _putItem(item: ComputerGroup): Promise<ComputerGroup> {
    let promise = new Promise<ComputerGroup>((resolve, reject) => {
      let url = this.computerGroupsEndpoint + '/' + item.id;
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
   * Attempts to delete the given computer group from the server. The work is done
   * as a promise which will resolve to the deleted computer group upon on success,
   * or reject with the server error if one occurs .
   * @param  {ComputerGroup}          item The target computer group to delete.
   * @return {Promise<ComputerGroup>}      Promise of the computer group being
   *                                     deleted.
   */
  _deleteItem(item: ComputerGroup): Promise<ComputerGroup> {
    let promise = new Promise<any>((resolve, reject) => {
      let url = this.computerGroupsEndpoint + '/' + item.id;
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
   * Attempts to get a subsection of computer groups from the server, from `start`
   * with length of `length`. The work is done as a promise which will resolve
   * to an array of the computer groups on success, or reject with the server error
   * if one occurs.
   * @param  {number = 0}           start  The starting index.
   * @param  {number = 10}          length The number of computer groups to fetch.
   * @return {Promise}     Promise of the array of requested computer groups.
   */
  _getFrom(start: number = 0, length: number = 10): Promise<Array<ComputerGroup>> {
    let promise = new Promise<Array<ComputerGroup>>((resolve, reject) => {
      this._http.get<Array<ComputerGroup>>(this.computerGroupsEndpoint, {
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
