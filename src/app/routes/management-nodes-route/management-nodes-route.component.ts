import { Component, OnInit } from '@angular/core';

/**
 * Renders the management nodes management page.
 */
@Component({
  selector: 'vcl-management-nodes-route',
  templateUrl: './management-nodes-route.component.html',
  styleUrls: ['./management-nodes-route.component.scss']
})
export class ManagementNodesRouteComponent implements OnInit {

  constructor() { }

  /**
   * OnInit hook to request data from the service provider after component
   * inititialization.
   */
  ngOnInit() {
  }

}
