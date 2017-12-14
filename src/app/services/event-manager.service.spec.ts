import { TestBed, inject } from '@angular/core/testing';

import { EventManagerService } from './event-manager.service';

describe('EventManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventManagerService]
    });
  });

  it('should be created', inject([EventManagerService], (service: EventManagerService) => {
    expect(service).toBeTruthy();
  }));
});
