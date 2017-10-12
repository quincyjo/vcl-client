import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Displays a login dialog for the user to login to the application.
 */
@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.scss']
})
export class LoginRouteComponent {
  /** FormGroup for the login form. **/
  public loginForm: FormGroup;
  /** Boolean representing the state of submission for `loginForm`. **/
  public submitted: boolean;
  /** Boolean representing if the submission of `loginForm` was successful or not. **/
  public success: boolean;

  constructor(private _authenticationService: AuthenticationService,
              private _formBuilder: FormBuilder,
              private _router: Router) {
    this._buildForm();
  }

  /**
   * Internal method for building the form.
   */
  private _buildForm(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Event handler for the `loginForm`'s ngSubmit event. Submits the form
   * information to `_authenticationService` and redirect on success. Displays
   * login errors to the user if authentication fails. Sets `submitted` to true
   * and `success` to the response from `_authenticationService`.
   */
  public onSubmit(): Promise<boolean> {
    let promise = new Promise((resolve, reject) => {
    this.submitted = true;
    this._authenticationService.authenticate(this.loginForm.value)
      .then((success) => {
        this.success = true;
        this._router.navigate(['/home']);
        resolve(true);
      })
      .catch((error) => {
        this.success = false;
        reject(false);
      });
    });
    return promise;
  }
}
