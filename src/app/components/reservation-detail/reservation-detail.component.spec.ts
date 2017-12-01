import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MockBackendService } from '../../services/mock-backend.service';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ReservationDetailComponent } from './reservation-detail.component';
import { ReservationProviderService } from '../../services/reservation-provider.service';

import { Observable } from 'rxjs';

describe('ReservationDetailComponent', () => {
  let component: ReservationDetailComponent;
  let fixture: ComponentFixture<ReservationDetailComponent>;
  let mockBackendService: MockBackendService;

  beforeEach(async(() => {
    // mockBackendService = new MockBackendService();
    // TestBed.configureTestingModule({
    //   declarations: [
    //     ReservationDetailComponent
    //   ],
    //   providers: [
    //     ReservationProviderService,
    //     { provide: HttpClient, useValue: mockBackendService },
    //     { provide: Router, useValue: {} },
    //     { provide: ActivatedRoute, useValue: {
    //       params: Observable.of({id: 0})
    //     }}
    //   ],
    //   imports: [
    //     RouterModule,
    //     MaterialModule,
    //   NoopAnimationsModule
    //   ]
    // })
    // .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(ReservationDetailComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should be created', () => {
    // expect(component).toBeTruthy();
  });
});
