import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsRouteComponent } from './groups-route.component';

describe('GroupsRouteComponent', () => {
  let component: GroupsRouteComponent;
  let fixture: ComponentFixture<GroupsRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
