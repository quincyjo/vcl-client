import { Injectable } from '@angular/core';
import { ManagementNode } from '../shared/management-node.class';
import { Provider } from '../shared/provider.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MockBackendService } from './mock-backend.service';
import { Response } from '../shared/response.class';
import { CONFIG } from '../shared/config';

@Injectable()
export class ManagementNodeProviderService extends Provider<ManagementNode> {
  /** The URL to the API endpoint for management node operations. **/
  private _endpoint: string = CONFIG.API_ROOT + '/managementnodes';

  constructor(private _http: HttpClient) {
    super();
    this._endpoint = CONFIG.API_ROOT + '/managementnodes';
  }

  /**
   * Attempts to add an image group to the server. The work is done as a promise which
   * will resolve to the added image group on success, or reject with the server error
   * if one occurs.
   * @param  {ManagementNode}             item The image group to add.
   * @return {Promise<Response>}      Promise of the image group being added.
   */
  _addItem(item: ManagementNode): Promise<Response> {
    let promise = new Promise<any>((resolve, reject) => {
      this._http.post<any>(this._endpoint, item)
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
   * Attempts to get an image group from the server. The work is done as a promise
   * which will resolve to the requested image group on success, or reject with the
   * server error if one occurs.
   * @param  {number}         id Id of the target image group.
   * @return {Promise<ManagementNode>}    Promise of the image group.
   */
  _getItem(id: number): Promise<ManagementNode> {
    let promise = new Promise<ManagementNode>((resolve, reject) => {
      let url = this._endpoint + '/' + id;
      this._http.get<ManagementNode>(url)
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
   * Attempts to update an item on the server with the given one. The work is
   * done as a promise which will resolve to the new version of the image group on
   * success, or reject with the server error if one occurs.
   * @param  {ManagementNode}          item The new version of an image group with id.
   * @return {Promise<ManagementNode>}      Promise of the image group being updated.
   */
  _putItem(item: ManagementNode): Promise<ManagementNode> {
    let promise = new Promise<ManagementNode>((resolve, reject) => {
      let url = this._endpoint + '/' + item.id;
      this._http.put<any>(url, item)
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
   * Attempts to delete the given image group from the server. The work is done as a
   * promise which will resolve to the deleted upon on success, or reject with
   * the server error if one occurs .
   * @param  {ManagementNode}          item The target image group to delete.
   * @return {Promise<ManagementNode>}      Promise of the image group being deleted.
   */
  _deleteItem(item: ManagementNode): Promise<ManagementNode> {
    let promise = new Promise<any>((resolve, reject) => {
      let url = this._endpoint + '/' + item.id;
      this._http.delete<any>(url)
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
   * Attempts to get a subsection of image groups from the server, from `start` with
   * length of `length`. The work is done as a promise which will resolve to
   * an array of the image groups on success, or reject with the server error if one
   * occurs.
   * @param  {number = 0}           start  The starting index.
   * @param  {number = 10}          length The number of image groups to fetch.
   * @return {Promise}     Promise of the array of requested image groups.
   */
  _getFrom(start: number = 0, length: number = 10): Promise<Array<ManagementNode>> {
    let promise = new Promise<Array<ManagementNode>>((resolve, reject) => {
      this._http.get<Array<ManagementNode>>(this._endpoint, {
        params: new HttpParams()
          .set('start', start.toString())
          .set('length', length.toString())
      })
        .subscribe(
          (result) => {
            let results = [];
            for (let node of result) {
              results.push(node);
            };
            resolve(results);
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }
}
