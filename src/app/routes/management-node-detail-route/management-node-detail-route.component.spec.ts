import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementNodeDetailRouteComponent } from './management-node-detail-route.component';

describe('ManagementNodeDetailRouteComponent', () => {
  let component: ManagementNodeDetailRouteComponent;
  let fixture: ComponentFixture<ManagementNodeDetailRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementNodeDetailRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementNodeDetailRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
