import { Injectable, EventEmitter } from '@angular/core';

/**
 * Gloabl event manager for app wide events. Allows the listenning and firing
 * of events across components and services. Manager the observables for these
 * events on the fly.
 */
@Injectable()
export class EventManagerService {
  private _events: any;

  constructor() { }

  /**
   * Fires the given event with key `label` with the value `event`.
   * @param {string} label The target event to trigger.
   * @param {any}    event The value of the event.
   */
  public fire(label: string, event: any): void {
    this._verify(label);
    this._events[label].emit(event);
  }

  /**
   * Subscribes to the event given by `label` with the given callback. Returns
   * with the subscription created. Should be unsubscribed when no longer
   * needed.
   * @param  {string} label The target event to subscribe to.
   * @param  {(}      cb    The callback to handle when the even fires.
   * @return {[type]}       The subscription.
   */
  public subscribe(label: string, cb: () => void): any {
    this._verify(label);
    return this._events[label].subscribe(cb);
  }

  /**
   * Verifies that a the EventEmitter for the given label exists. If it does not
   * exist, then it is created.
   * @param {string} label The label of the EventEmitter to check.
   */
  private _verify(label: string): void {
    if (!this._events[label]) {
      this._events[label] = new EventEmitter();
    }
  }
}
