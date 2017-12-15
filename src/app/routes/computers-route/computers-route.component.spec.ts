import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComputerProviderService } from '../../services/computer-provider.service';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockBackendService } from '../../services/mock-backend.service';
import { HttpClient } from '@angular/common/http';
import { Computer } from '../../shared/computer.class';
import { Observable } from 'rxjs';
import { FilterSelectorComponent } from '../../components/list/filter-selector/filter-selector.component';
import { EventManagerService } from '../../services/event-manager.service';
import { Router } from '@angular/router';

import { ComputersRouteComponent } from './computers-route.component';
import { ListComponent } from '../../components/list/list.component';

describe('ComputersRouteComponent', () => {
  let component: ComputersRouteComponent;
  let fixture: ComponentFixture<ComputersRouteComponent>;
  let mockBackendService: MockBackendService;
  let eventManager: EventManagerService;

  beforeEach(async(() => {
    mockBackendService = new MockBackendService();
    TestBed.configureTestingModule({
      declarations: [
        ComputersRouteComponent,
        FilterSelectorComponent,
        ListComponent
      ],
      providers: [
        ComputerProviderService,
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
    fixture = TestBed.createComponent(ComputersRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
