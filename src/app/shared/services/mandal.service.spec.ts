import { TestBed } from '@angular/core/testing';

import { MandalService } from './mandal.service';

describe('MandalService', () => {
  let service: MandalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MandalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
