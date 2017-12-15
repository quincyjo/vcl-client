import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MockBackendService } from '../../services/mock-backend.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EventManagerService } from '../../services/event-manager.service';
import { Router } from '@angular/router';

import { ComputerGroupDetailRouteComponent } from './computer-group-detail-route.component';
import { ListEditorComponent } from '../../components/list-editor/list-editor.component';
import { FormStatusComponent } from '../../components/form-status/form-status.component';
import { ComputerProviderService } from '../../services/computer-provider.service';
import { ComputerGroupProviderService } from '../../services/computer-group-provider.service';

import { Observable } from 'rxjs';

describe('ComputerGroupDetailRouteComponent', () => {
  let component: ComputerGroupDetailRouteComponent;
  let fixture: ComponentFixture<ComputerGroupDetailRouteComponent>;
  let mockBackend: MockBackendService;
  let eventManager: EventManagerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ComputerGroupDetailRouteComponent,
        ListEditorComponent,
        FormStatusComponent
      ],
      providers: [
        ComputerProviderService,
        ComputerGroupProviderService,
        { provide: HttpClient, userValue: mockBackend },
        { provide: EventManagerService, userValue: eventManager },
        { provide: Router, userValue: {} },
        { provide: ActivatedRoute, useValue: {
          params: Observable.of({id: 0})
        }}
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerGroupDetailRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
