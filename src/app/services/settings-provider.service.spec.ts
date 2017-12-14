import { TestBed, inject } from '@angular/core/testing';

import { SettingsProviderService } from './settings-provider.service';

describe('SettingsProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsProviderService]
    });
  });

  it('should be created', inject([SettingsProviderService], (service: SettingsProviderService) => {
    expect(service).toBeTruthy();
  }));
});
