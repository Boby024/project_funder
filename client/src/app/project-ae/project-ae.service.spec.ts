import { TestBed } from '@angular/core/testing';

import { ProjectAeService } from './project-ae.service';

describe('ProjectAeService', () => {
  let service: ProjectAeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectAeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
