import { TestBed, async, inject } from '@angular/core/testing';

import { CourseGuard } from './course.guard';

describe('CourseGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseGuard],
    });
  });

  it(
    'should ...',
    inject([CourseGuard], (guard: CourseGuard) => {
      expect(guard).toBeTruthy();
    })
  );
});
