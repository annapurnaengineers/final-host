import { TestBed } from '@angular/core/testing';

import { ClientaddService } from './clientadd.service';

describe('ClientaddService', () => {
  let service: ClientaddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientaddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
