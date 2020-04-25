import { TestBed } from '@angular/core/testing';

import { SingleViewService } from './single-view.service';

describe('SingleViewService', () => {
  let service: SingleViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
