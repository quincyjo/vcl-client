import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { NavItemComponent } from './nav-item.component';

describe('NavItemComponent', () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavItemComponent
      ],
      providers: [
        // { provide: Router, useValue: {} },
        // { provide: ActivatedRoute, useValue: {} },
      ],
      imports: [
        RouterModule,
        MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
