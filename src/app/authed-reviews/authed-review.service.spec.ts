import { TestBed, inject } from '@angular/core/testing';

import { AuthedReviewService } from './authed-review.service';

describe('AuthedReviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthedReviewService]
    });
  });

  it('should be created', inject([AuthedReviewService], (service: AuthedReviewService) => {
    expect(service).toBeTruthy();
  }));
});
