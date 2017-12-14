import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementNodesRouteComponent } from './management-nodes-route.component';

describe('ManagementNodesRouteComponent', () => {
  let component: ManagementNodesRouteComponent;
  let fixture: ComponentFixture<ManagementNodesRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementNodesRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementNodesRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
