import { TestBed } from '@angular/core/testing';

import { StudentAccountsService } from './student-accounts.service';

describe('StudentAccountsService', () => {
  let service: StudentAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
