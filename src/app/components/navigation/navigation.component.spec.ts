import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { NavigationComponent } from './navigation.component';
import { NavItemComponent } from './nav-item/nav-item.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
        NavItemComponent
      ],
      providers: [
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
      ],
      imports: [
        RouterModule,
        MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
