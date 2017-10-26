import { Injectable } from '@angular/core';
import { Provider } from '../shared/provider.class';
import { UserGroup } from '../shared/user-group.class';
import { Response, Success, Error } from '../shared/response.class';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UserGroupProviderService extends Provider<UserGroup> {
  public userGroupsEndpoint: string = '/api/usergroups';

  constructor(private _http: HttpClient) {
    super();
    this.userGroupsEndpoint = '/api/usergroups';
  }

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
