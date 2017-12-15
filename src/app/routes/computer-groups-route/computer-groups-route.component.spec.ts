import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComputerGroupProviderService } from '../../services/computer-group-provider.service';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockBackendService } from '../../services/mock-backend.service';
import { HttpClient } from '@angular/common/http';
import { ListComponent } from '../../components/list/list.component';
import { ComputerGroup } from '../../shared/computer-group.class';
import { Observable } from 'rxjs';
import { FilterSelectorComponent } from '../../components/list/filter-selector/filter-selector.component';
import { EventManagerService } from '../../services/event-manager.service';
import { Router } from '@angular/router';

import { ComputerGroupsRouteComponent } from './computer-groups-route.component';

describe('ComputerGroupsRouteComponent', () => {
  let component: ComputerGroupsRouteComponent;
  let fixture: ComponentFixture<ComputerGroupsRouteComponent>;
  let mockBackendService: MockBackendService;
  let reservationProvider: ComputerGroupProviderService;
  let eventManager: EventManagerService;

  beforeEach(async(() => {
    mockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      declarations: [
        ComputerGroupsRouteComponent,
        FilterSelectorComponent,
        ListComponent
      ],
      providers: [
        ComputerGroupProviderService,
        { provide: HttpClient, useValue: mockBackendService },
        { provide: EventManagerService, useValue: eventManager },
        { provide: Router, useValue: { } }
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerGroupsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
