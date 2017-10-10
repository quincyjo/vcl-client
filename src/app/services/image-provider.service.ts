import { Injectable } from '@angular/core';
import { Image } from '../shared/image.class';
import { Provider } from '../shared/provider.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MockBackendService } from './mock-backend.service';
import { Response } from '../shared/response.class';

@Injectable()
export class ImageProviderService extends Provider<Image> {
  private imagesEndpoint: string = '/api/images';

  constructor(private _http: HttpClient) {
    super();
    this.imagesEndpoint = '/api/images';
  }

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

  _getItem(id: number): Promise<Image> {
    let promise = new Promise<Image>((resolve, reject) => {
      let url = this.imagesEndpoint + '/' + id;
      this._http.get<Image>(url)
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

  _getFrom(start: number = 0, length: number = 10): Promise<Array<Image>> {
    let promise = new Promise<Array<Image>>((resolve, reject) => {
      this._http.get<Array<Image>>(this.imagesEndpoint, {
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
