import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MockBackendService } from '../../services/mock-backend.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { ListEditorComponent } from '../../components/list-editor/list-editor.component';
import { FormStatusComponent } from '../../components/form-status/form-status.component';
import { ImageProviderService } from '../../services/image-provider.service';
import { ImageGroupProviderService } from '../../services/image-group-provider.service';

import { Observable } from 'rxjs';

import { ImageGroupDetailRouteComponent } from './image-group-detail-route.component';

describe('ImageGroupDetailRouteComponent', () => {
  let component: ImageGroupDetailRouteComponent;
  let fixture: ComponentFixture<ImageGroupDetailRouteComponent>;
  let mockBackend: MockBackendService;

  beforeEach(async(() => {
    mockBackend = new MockBackendService();
    TestBed.configureTestingModule({
      declarations: [
        ImageGroupDetailRouteComponent,
        ListEditorComponent,
        FormStatusComponent
      ],
      providers: [
        ImageProviderService,
        ImageGroupProviderService,
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
    fixture = TestBed.createComponent(ImageGroupDetailRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
