import { Injectable } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';

@Injectable()
class MockRouter {
  public events: Observable<any>;

  constructor() {
    this.events = new Observable<any>();
  }
}

@Injectable()
class MockActivatedRoute {
  constructor() { }
}

describe('AppComponent', () => {
  // beforeEach(async(() => {
  //   let mockRouter = new MockRouter();
  //   let mockActivatedRoute = new MockActivatedRoute();
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       AppComponent
  //     ],
  //     providers: [
  //       { provide: Router, useValue: mockRouter },
  //       { provide: ActivatedRoute, useValue: mockActivatedRoute }
  //     ],
  //     imports: [
  //       RouterModule,
  //       MaterialModule
  //     ],
  //     schemas: [CUSTOM_ELEMENTS_SCHEMA]
  //   }).compileComponents();
  // }));
  //
  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
  //
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  //
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
