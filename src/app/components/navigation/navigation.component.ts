import { Component, OnInit } from '@angular/core';
import { NavItemComponent } from './nav-item/nav-item.component';

@Component({
  selector: 'vcl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
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

  public menu = [
    this.links.home,
    this.links.reservations,
    this.links.manage
  ];

  constructor() { }

  ngOnInit() {
  }

}
