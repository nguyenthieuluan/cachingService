import { TestBed } from '@angular/core/testing';

import { CacheRegistrationService } from './cache-registration.service';

describe('CacheRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheRegistrationService = TestBed.get(CacheRegistrationService);
    expect(service).toBeTruthy();
  });
});
