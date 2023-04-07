import { TestBed } from '@angular/core/testing';

import { TenetsService } from './tenets.service';

describe('TenetsService', () => {
  let service: TenetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
