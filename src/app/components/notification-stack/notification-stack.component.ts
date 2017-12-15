import { Component, OnInit } from '@angular/core';
import { EventManagerService } from '../../services/event-manager.service';

/**
 * Displays a stack of notification emitted from the `EventManagerService`.
 */
@Component({
  selector: 'vcl-notification-stack',
  templateUrl: './notification-stack.component.html',
  styleUrls: ['./notification-stack.component.scss']
})
export class NotificationStackComponent implements OnInit {

  constructor(
    private _eventManager: EventManagerService
  ) { }

  /**
   * Angular OnInit lifecycle hook to bind to `_eventManager`.
   */
  ngOnInit(): void {
    this._eventManager.subscribe('error', (error: any) => {
      console.log(error);
    });
  }

}
