import { TestBed, inject } from '@angular/core/testing';

import { ReviewService } from './review.service';

describe('ReviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewService]
    });
  });

  it('should be created', inject([ReviewService], (service: ReviewService) => {
    expect(service).toBeTruthy();
  }));
});
