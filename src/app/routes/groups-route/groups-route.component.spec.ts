import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventManagerService } from '../../services/event-manager.service';
import { HttpClient } from '@angular/common/http';

import { GroupsRouteComponent } from './groups-route.component';
import { ListComponent } from '../../components/list/list.component';
import { UserGroupProviderService } from '../../services/user-group-provider.service';
import { MockBackendService } from '../../services/mock-backend.service';
import { FilterSelectorComponent } from '../../components/list/filter-selector/filter-selector.component';

describe('GroupsRouteComponent', () => {
  let component: GroupsRouteComponent;
  let fixture: ComponentFixture<GroupsRouteComponent>;
  let eventManager: EventManagerService;

  beforeEach(async(() => {
    let backend: MockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [
        GroupsRouteComponent,
        FilterSelectorComponent,
        ListComponent
      ],
      providers: [
        UserGroupProviderService,
        { provide: HttpClient, useValue: backend},
        { provide: EventManagerService, useValue: eventManager}
      ]
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
