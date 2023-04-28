import { TestBed } from '@angular/core/testing';

import { BatchStandardService } from './batch-standard.service';

describe('BatchStandardService', () => {
  let service: BatchStandardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchStandardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
