import { Injectable } from '@angular/core';
import { User, USERS } from './USERS';

@Injectable()
export class AuthenticationService {
  /** An internal list of users only for testing purposes. **/
  private _users: Array<User>;
  /** The user credentials for the current user if authenticated. **/
  private _activeUser: User;
  /** The API token for the current user if authenticated. **/
  private _token: any;

  /**
   * The current username if authenticated. If not, will be set to 'Not Logged
   * In',
   * @return {string} The current username.
   */
  get username(): string { return this._activeUser ? this._activeUser.username : 'Not Logged In'; }

  /**
   * The current state of authentication for the application.
   * @return {boolean} True if a user is logged in and authenticated, false
   * otherwise.
   */
  get isAuthenticated(): boolean { return !!this._token; }

  constructor() {
    this._users = USERS;
  }

  /**
   * Attempts to authenticate with the given user credentials. Resolves to a
   * boolean to true if authentication was successful and false if the
   * given credentials were incorrect. Rejects with the server error if
   * something else goes wrong.
   * @param  {User}             user The user credentials to validate.
   * @return {Promise<boolean>}      A promise of the authentication.
   */
  public authenticate(user: User): Promise<boolean> {
    let promise = new Promise((resolve, reject) => {
      let found = (user.username && user.password)
                ? this._users.find((elem) => {
                  return (
                    user.username.toLowerCase() === elem.username.toLowerCase() &&
                    user.password === elem.password);
                  })
                : false;
      if (found) {
        resolve(true);
        this._token = true;
        this._activeUser = user;
      } else {
        resolve(false);
      }
    });
    return promise;
  }

  /**
   * Logs the current user out and removes all their informatino from the
   * application.
   * @return {Promise<boolean>} A promise of logging out.
   */
  public logout(): Promise<boolean> {
    let promise = new Promise((resolve, reject) => {
      this._activeUser = undefined;
      this._token = undefined;
      resolve();
    });
    return promise;
  }
}
