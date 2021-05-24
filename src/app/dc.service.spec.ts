import { TestBed } from '@angular/core/testing';

import { DcService } from './services/dc.service';

describe('DcService', () => {
  let service: DcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
