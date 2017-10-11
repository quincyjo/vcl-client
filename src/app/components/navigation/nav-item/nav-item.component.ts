import { Component, Input, Output } from '@angular/core';

/**
 * NavItemComponent item for NavigationComponent which determines how to rendered
 * an item on the navigation menu, inlcuding element type and sub menues.
 */
@Component({
  selector: 'vcl-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  /** Input for what type of nav item it is, button by default. **/
  @Input() type: string = 'button';
  /** Input for the configurationof the nav-item. **/
  @Input() link: {
    label: string,
    routerLink?: string,
    href?: string,
    sub?: Array<any>
  };

  constructor() { }

}
