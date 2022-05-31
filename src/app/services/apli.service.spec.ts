import { TestBed } from '@angular/core/testing';

import { ApliService } from './apli.service';

describe('ApliService', () => {
  let service: ApliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
