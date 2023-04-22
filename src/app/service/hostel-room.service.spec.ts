import { TestBed } from '@angular/core/testing';

import { HostelRoomService } from './hostel-room.service';

describe('HostelRoomService', () => {
  let service: HostelRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostelRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
