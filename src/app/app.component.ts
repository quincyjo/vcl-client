import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

/**
 * Root application component used as the bootsrap point.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** Boolean representing if the header should be displayed. **/
  public header: boolean = true;
  /** Boolean representing if the footer should be displayed. **/
  public footer: boolean = true;

  /**
   * An array of objectes representing the links to display in the NavigationEnd
   * in the header of the application.
   */
  public links: Array<Object> = [
    {
      label: 'Home',
      routerLink: ['/home']
    },
    {
      label: 'Reservations',
      routerLink: ['/reservations']
    },
    {
      label: 'Manage',
      sub: [
        {
          label: 'Images'
        }
      ]
    }
  ];

  /**
   * Getter for the current username to display.
   * @return {string} The current username.
   */
  get username(): string { return this._auth.username; }

  /**
   * Getter for the current authentication status of the application user. Used
   * to determine what header options to display.
   * @return {boolean} The current authentication status.
   */
  get isAuth(): boolean {
    return this._auth.isAuthenticated;
  }

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _auth: AuthenticationService) {
    _router.events
    .filter(e => e instanceof NavigationEnd)
    .forEach(e => {
      this.header = _route.root.firstChild.snapshot.data['header'];
      this.footer = _route.root.firstChild.snapshot.data['footer'];
      this.header = this.header !== undefined ? this.header : true;
      this.footer = this.footer !== undefined ? this.footer : true;
    });
  }

  /**
   * Logs out the current user from the application via the
   * `AuthenticationService`.
   */
  public logout(): void {
    this._auth.logout()
    .then((result) => {
      this._router.navigate(['/login']);
    })
    .catch((error) => {
      console.log("Error logging out:", error);
    });
  }
}
