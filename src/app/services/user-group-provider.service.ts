import { Injectable } from '@angular/core';
import { Provider } from '../shared/provider.class';
import { UserGroup } from '../shared/user-group.class';
import { Response, Success, Error } from '../shared/response.class';
import { HttpClient, HttpParams } from '@angular/common/http';

/**
 * Concrete provider implementation of Provider for user grups.
 */
@Injectable()
export class UserGroupProviderService extends Provider<UserGroup> {
  /** API endpoint for user groups. **/
  public userGroupsEndpoint: string = '/api/usergroups';

  constructor(private _http: HttpClient) {
    super();
    this.userGroupsEndpoint = '/api/usergroups';
  }

  /**
   * Attempts to add a user group to the server. The work is done as a promise
   * which will resolve to the added user group on success, or reject with the
   * server error if one occurs.
   * @param  {UserGroup}             item The user group to add.
   * @return {Promise<Response>}      Promise of the user group being added.
   */
  public _addItem(group: UserGroup): Promise<Response> {
    let promise = new Promise<Response>((resolve, reject) => {
      this._http.post<Response>(this.userGroupsEndpoint, group)
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }

  /**
   * Attempts to get a user group from the server. The work is done as a
   * promise which will resolve to the requested user group on success, or
   * reject with the server error if one occurs.
   * @param  {number}         id Id of the target user group.
   * @return {Promise<UserGroup>}    Promise of the user group.
   */
  public _getItem(id: number): Promise<UserGroup> {
    let url = this.userGroupsEndpoint + '/' + id;
    let promise = new Promise<UserGroup>((resolve, reject) => {
      this._http.get<UserGroup>(url)
        .subscribe(
          (group) => {
            resolve(group);
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }

  /**
   * Attempts to update a user group on the server with the given one. The work
   * is done as a promise which will resolve to the new version of the
   * user group on success, or reject with the server error if one occurs.
   * @param  {UserGroup}          item The new version of an user group with
   *                                     id.
   * @return {Promise<UserGroup>}      Promise of the user group being
   *                                     updated.
   */
  public _putItem(group: UserGroup): Promise<UserGroup> {
    let promise = new Promise<UserGroup>((resolve, reject) => {
      let url = this.userGroupsEndpoint + '/' + group.id;
      this._http.put<UserGroup>(url, group)
        .subscribe(
          (response) => {
            resolve(group);
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }

  /**
   * Attempts to delete the given user group from the server. The work is done
   * as a promise which will resolve to the deleted user group upon on success,
   * or reject with the server error if one occurs .
   * @param  {UserGroup}          item The target user group to delete.
   * @return {Promise<UserGroup>}      Promise of the user group being
   *                                     deleted.
   */
  public _deleteItem(group: UserGroup): Promise<UserGroup> {
    let url = this.userGroupsEndpoint + '/' + group.id;
    let promise = new Promise<UserGroup>((resolve, reject) => {
      this._http.delete<UserGroup>(url, group)
        .subscribe(
          (response) => {
            resolve(group);
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }

  /**
   * Attempts to get a subsection of user groups from the server, from `start`
   * with length of `length`. The work is done as a promise which will resolve
   * to an array of the user groups on success, or reject with the server error
   * if one occurs.
   * @param  {number = 0}           start  The starting index.
   * @param  {number = 10}          length The number of user groups to fetch.
   * @return {Promise}     Promise of the array of requested user groups.
   */
  public _getFrom(start: number = 0, length: number = 10): Promise<Array<UserGroup>> {
    let promise = new Promise<Array<UserGroup>>((resolve, reject) => {
      this._http.get<Array<UserGroup>>(this.userGroupsEndpoint, {
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
