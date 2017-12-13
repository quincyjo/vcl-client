import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MockBackendService } from '../../services/mock-backend.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { ComputerDetailRouteComponent } from './computer-detail-route.component';
import { ListEditorComponent } from '../../components/list-editor/list-editor.component';
import { FormStatusComponent } from '../../components/form-status/form-status.component';
import { ComputerProviderService } from '../../services/computer-provider.service';
import { ComputerGroupProviderService } from '../../services/computer-group-provider.service';

import { Observable } from 'rxjs';

describe('ComputerDetailRouteComponent', () => {
  let component: ComputerDetailRouteComponent;
  let fixture: ComponentFixture<ComputerDetailRouteComponent>;
  let mockBackend: MockBackendService;

  beforeEach(async(() => {
    mockBackend = new MockBackendService();
    TestBed.configureTestingModule({
      declarations: [
        ComputerDetailRouteComponent,
        ListEditorComponent,
        FormStatusComponent
      ],
      providers: [
        ComputerProviderService,
        ComputerGroupProviderService,
        { provide: HttpClient, userValue: mockBackend },
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
    fixture = TestBed.createComponent(ComputerDetailRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
