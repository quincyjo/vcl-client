import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'vcl-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() link: {
    label: string,
    routerLink?: string,
    href?: string,
    sub?: Array<any>
  };

  constructor() { }

  ngOnInit() {
  }

}
