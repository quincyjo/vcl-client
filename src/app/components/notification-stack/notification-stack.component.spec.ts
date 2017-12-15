import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagerService } from '../../services/event-manager.service';
import { NotificationStackComponent } from './notification-stack.component';

describe('NotificationStackComponent', () => {
  let component: NotificationStackComponent;
  let fixture: ComponentFixture<NotificationStackComponent>;
  let eventManager: EventManagerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotificationStackComponent
      ],
      providers: [
        { provide: EventManagerService, useValue: eventManager }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
