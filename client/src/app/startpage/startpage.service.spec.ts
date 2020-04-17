import { TestBed } from '@angular/core/testing';

import { StartpageService } from './startpage.service';

describe('StartpageService', () => {
  let service: StartpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
