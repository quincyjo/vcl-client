import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersRouteComponent } from './computers-route.component';

describe('ComputersRouteComponent', () => {
  let component: ComputersRouteComponent;
  let fixture: ComponentFixture<ComputersRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputersRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputersRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
