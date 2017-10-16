import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesRouteComponent } from './schedules-route.component';

describe('SchedulesRouteComponent', () => {
  let component: SchedulesRouteComponent;
  let fixture: ComponentFixture<SchedulesRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulesRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
