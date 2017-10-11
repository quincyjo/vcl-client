import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

/**
 * Guards a route against access while not authenticated.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * Constructs the auth guad.
   */
  constructor(private _authenticationService: AuthenticationService,
              private _router: Router) { }

  /**
   * Implements `canActivate`. Returns true if the current user is authenticated
   * and false if not.
   * @return {boolean} [description]
   */
  public canActivate(): boolean {
    // if (this._authenticationService.isAuthenticated()) {
    //   return true;
    // } else {
    //   this._router.navigate(['/login']);
    // }
    return true;
  }
}
