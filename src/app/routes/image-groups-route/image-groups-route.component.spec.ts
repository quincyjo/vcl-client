import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ImageGroupsRouteComponent } from './image-groups-route.component';
import { ListComponent } from '../../components/list/list.component';
import { FilterSelectorComponent } from '../../components/list/filter-selector/filter-selector.component';
import { MockBackendService } from '../../services/mock-backend.service';
import { ImageGroupProviderService } from '../../services/image-group-provider.service';

describe('ImageGroupsRouteComponent', () => {
  let component: ImageGroupsRouteComponent;
  let fixture: ComponentFixture<ImageGroupsRouteComponent>;
  let mockBackend: MockBackendService;

  beforeEach(async(() => {
    mockBackend = new MockBackendService();
    TestBed.configureTestingModule({
      declarations: [
        ImageGroupsRouteComponent,
        ListComponent,
        FilterSelectorComponent
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        ImageGroupProviderService,
        { provide: HttpClient, useValue: mockBackend },
        { provide: Router, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGroupsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
