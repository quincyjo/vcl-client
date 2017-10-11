import { Component, OnInit } from '@angular/core';

/**
 * Displays the home page and dash board to the user.
 */
@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.scss']
})
export class HomeRouteComponent implements OnInit {

  constructor() { }

  /**
   * Angular life-cycle hook for after the component has been initialized.
   */
  public ngOnInit(): void {
  }

}
