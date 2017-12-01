import { Injectable } from '@angular/core';
import { Image } from '../shared/image.class';
import { Provider } from '../shared/provider.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MockBackendService } from './mock-backend.service';
import { Response } from '../shared/response.class';

/**
 * Provider for images.
 */
@Injectable()
export class ImageProviderService extends Provider<Image> {
  /** The URL to the API endpoint for image operations. **/
  private imagesEndpoint: string = '/api/images';

  constructor(private _http: HttpClient) {
    super();
    this.imagesEndpoint = '/api/images';
  }

  /**
   * Attempts to add an image to the server. The work is done as a promise which
   * will resolve to the added image on success, or reject with the server error
   * if one occurs.
   * @param  {Image}             item The image to add.
   * @return {Promise<Response>}      Promise of the image being added.
   */
  _addItem(item: Image): Promise<Response> {
    let promise = new Promise<any>((resolve, reject) => {
      this._http.post<any>(this.imagesEndpoint, item)
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
   * Attempts to get an image from the server. The work is done as a promise
   * which will resolve to the requested image on success, or reject with the
   * server error if one occurs.
   * @param  {number}         id Id of the target image.
   * @return {Promise<Image>}    Promise of the image.
   */
  _getItem(id: number): Promise<Image> {
    let promise = new Promise<Image>((resolve, reject) => {
      let url = this.imagesEndpoint + '/' + id;
      this._http.get<Image>(url)
        .subscribe(
          (result) => {
            resolve(Image.rebuild(result));
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }

  /**
   * Attempts to update an item on the server with the given one. The work is
   * done as a promise which will resolve to the new version of the image on
   * success, or reject with the server error if one occurs.
   * @param  {Image}          item The new version of an image with id.
   * @return {Promise<Image>}      Promise of the image being updated.
   */
  _putItem(item: Image): Promise<Image> {
    let promise = new Promise<Image>((resolve, reject) => {
      let url = this.imagesEndpoint + '/' + item.id;
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
   * Attempts to delete the given image from the server. The work is done as a
   * promise which will resolve to the deleted upon on success, or reject with
   * the server error if one occurs .
   * @param  {Image}          item The target image to delete.
   * @return {Promise<Image>}      Promise of the image being deleted.
   */
  _deleteItem(item: Image): Promise<Image> {
    let promise = new Promise<any>((resolve, reject) => {
      let url = this.imagesEndpoint + '/' + item.id;
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
   * Attempts to get a subsection of images from the server, from `start` with
   * length of `length`. The work is done as a promise which will resolve to
   * an array of the images on success, or reject with the server error if one
   * occurs.
   * @param  {number = 0}           start  The starting index.
   * @param  {number = 10}          length The number of images to fetch.
   * @return {Promise}     Promise of the array of requested images.
   */
  _getFrom(start: number = 0, length: number = 10): Promise<Array<Image>> {
    let promise = new Promise<Array<Image>>((resolve, reject) => {
      this._http.get<Array<Image>>(this.imagesEndpoint, {
        params: new HttpParams()
          .set('start', start.toString())
          .set('length', length.toString())
      })
        .subscribe(
          (result) => {
            let results = [];
            result.map((image) => {
              results.push(Image.rebuild(image));
            });
            resolve(results);
          },
          (error) => {
            reject(error);
          });
    });
    return promise;
  }
}
