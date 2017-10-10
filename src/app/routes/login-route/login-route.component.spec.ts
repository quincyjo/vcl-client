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
}

@Injectable()
class MockAuthenticationService {
  constructor() { }
}

describe('LoginRouteComponent', () => {
  let component: LoginRouteComponent;
  let fixture: ComponentFixture<LoginRouteComponent>;

  beforeEach(async(() => {
    let mockRouter = new MockRouter();
    let mockAuthenticationService = new MockAuthenticationService();
    TestBed.configureTestingModule({
      declarations: [
        LoginRouteComponent
      ],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthenticationService},
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
});
