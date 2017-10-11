import { Component, OnInit } from '@angular/core';
import { NavItemComponent } from './nav-item/nav-item.component';

/**
 * Component which geneates the navigation for the application. The static
 * `menu` attribute describes the state of the navigation bar, and it will
 * be generated accordingly.
 */
@Component({
  selector: 'vcl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  /** The links by id for the navigation. **/
  public links = {
    home : {
      label: 'Home',
      routerLink: ['/home']
    },
    reservations: {
      label: 'Reservations',
      routerLink: ['/reservations']
    },
    manage: {
      label: 'Manage',
      sub: [
        {
          label: 'Images',
          routerLink: ['./images']
        }
      ]
    }
  };

  /** The array of links in order that they should be rendered. **/
  public menu = [
    this.links.home,
    this.links.reservations,
    this.links.manage
  ];

  constructor() { }

}
