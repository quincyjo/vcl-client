import { Injectable } from '@angular/core';
import { Reservation } from '../shared/reservation.class';
import { RESERVATIONS, ReservationType, RESERVATIONTYPES, ENVIRONMENTS } from './RESERVATIONS';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MockBackendService } from './mock-backend.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Provider } from '../shared/provider.class';
import { Response } from '../shared/response.class';

@Injectable()
export class ReservationProviderService extends Provider<Reservation> {
  private reservationsEndpoint: string = '/api/reservations';

  constructor(private _http: HttpClient) {
    super();
    this.reservationsEndpoint = '/api/reservations';
  }

  /**
   * Getter for the list of reservation types.
   * @return {Array<ReservationType>} Array of reservation types.
   */
  public getReservationTypes(): Array<ReservationType> {
    return RESERVATIONTYPES.slice();
  }

  /**
   * Getter for the list of environments.
   * @return {Array<string>} Array of available environments.
   */
  public getEnvironments(): Array<string> {
    return ENVIRONMENTS.slice();
  }

  /**
   * Attempts to add a reservation to the server. The work is done as a promise
   * which will resolve to the added reservation on success, or reject with the
   * server error if one occurs.
   * @param  {Reservation}             item The reservation to add.
   * @return {Promise<Response>}      Promise of the reservation being added.
   */
  _addItem(item: Reservation): Promise<Response> {
    let promise = new Promise<Response>((resolve, reject) => {
      this._http.post<Response>(this.reservationsEndpoint, item)
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
   * Attempts to get a reservation from the server. The work is done as a
   * promise which will resolve to the requested reservation on success, or
   * reject with the server error if one occurs.
   * @param  {number}         id Id of the target reservation.
   * @return {Promise<Reservation>}    Promise of the reservation.
   */
  _getItem(id: number): Promise<Reservation> {
    let promise = new Promise<Reservation>((resolve, reject) => {
      let url = this.reservationsEndpoint + '/' + id;
      this._http.get<Reservation>(url)
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
   * Attempts to update a reservation on the server with the given one. The work
   * is done as a promise which will resolve to the new version of the
   * reservation on success, or reject with the server error if one occurs.
   * @param  {Reservation}          item The new version of an reservation with
   *                                     id.
   * @return {Promise<Reservation>}      Promise of the reservation being
   *                                     updated.
   */
  _putItem(item: Reservation): Promise<Reservation> {
    let promise = new Promise<Reservation>((resolve, reject) => {
      let url = this.reservationsEndpoint + '/' + item.id;
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
   * Attempts to delete the given reservation from the server. The work is done
   * as a promise which will resolve to the deleted reservation upon on success,
   * or reject with the server error if one occurs .
   * @param  {Reservation}          item The target reservation to delete.
   * @return {Promise<Reservation>}      Promise of the reservation being
   *                                     deleted.
   */
  _deleteItem(item: Reservation): Promise<Reservation> {
    let promise = new Promise<any>((resolve, reject) => {
      let url = this.reservationsEndpoint + '/' + item.id;
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
   * Attempts to get a subsection of reservations from the server, from `start`
   * with length of `length`. The work is done as a promise which will resolve
   * to an array of the reservations on success, or reject with the server error
   * if one occurs.
   * @param  {number = 0}           start  The starting index.
   * @param  {number = 10}          length The number of reservations to fetch.
   * @return {Promise}     Promise of the array of requested reservations.
   */
  _getFrom(start: number = 0, length: number = 10): Promise<Array<Reservation>> {
    let promise = new Promise<Array<Reservation>>((resolve, reject) => {
      this._http.get<Array<Reservation>>(this.reservationsEndpoint, {
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
