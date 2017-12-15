import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MockBackendService } from '../../services/mock-backend.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EventManagerService } from '../../services/event-manager.service';
import { Router } from '@angular/router';

import { ImageDetailRouteComponent } from './image-detail-route.component';
import { ListEditorComponent } from '../../components/list-editor/list-editor.component';
import { FormStatusComponent } from '../../components/form-status/form-status.component';
import { ImageProviderService } from '../../services/image-provider.service';
import { ImageGroupProviderService } from '../../services/image-group-provider.service';

import { Observable } from 'rxjs';

describe('ImageDetailRouteComponent', () => {
  let component: ImageDetailRouteComponent;
  let fixture: ComponentFixture<ImageDetailRouteComponent>;
  let mockBackend: MockBackendService;
  let eventManager: EventManagerService;

  beforeEach(async(() => {
    mockBackend = new MockBackendService();
    TestBed.configureTestingModule({
      declarations: [
        ImageDetailRouteComponent,
        ListEditorComponent,
        FormStatusComponent
      ],
      providers: [
        ImageProviderService,
        ImageGroupProviderService,
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
    fixture = TestBed.createComponent(ImageDetailRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
