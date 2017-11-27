import { TestBed, inject } from '@angular/core/testing';

import { GradeService } from './grade.service';

describe('GradeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GradeService]
    });
  });

  it('should be created', inject([GradeService], (service: GradeService) => {
    expect(service).toBeTruthy();
  }));
});
