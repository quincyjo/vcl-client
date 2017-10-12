import { Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';

import { LoginRouteComponent } from './login-route.component';

@Injectable()
class MockRouter {
  constructor() { }

  public navigate(...args): void {

  }
}

@Injectable()
class MockAuthenticationService {
  constructor() { }
}

describe('LoginRouteComponent', () => {
  let component: LoginRouteComponent;
  let fixture: ComponentFixture<LoginRouteComponent>;
  let authService: AuthenticationService;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    authService = new AuthenticationService();
    TestBed.configureTestingModule({
      declarations: [
        LoginRouteComponent
      ],
      providers: [
        { provide: AuthenticationService, useValue: authService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should attempt to login on submission', () => {
    let spy = spyOn(authService, 'authenticate')
      .and.returnValue(Promise.resolve());
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to home on successful authentication', async(() => {
    let spy = spyOn(authService, 'authenticate')
      .and.returnValue(Promise.resolve());
    let routerSpy = spyOn(mockRouter, 'navigate')
      .and.stub();
    component.onSubmit()
      .then((result) => {
        expect(routerSpy).toHaveBeenCalledWith(['/home']);
      })
      .catch((error) => {
        fail(error);
      });
  }));

  it('should set success to false on rejected authentication', async(() => {
    let spy = spyOn(authService, 'authenticate')
      .and.returnValue(Promise.reject(''));
    component.onSubmit()
      .then((result) => {
        fail('Got result on expected rejection.');
      })
      .catch((error) => {
        expect(component.success).toBeDefined();
        expect(component.success).toBeFalsy();
      });
  }));
});
