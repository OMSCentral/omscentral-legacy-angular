import { ReviewsModule } from './reviews.module';

describe('ReviewsModule', () => {
  let reviewsModule: ReviewsModule;

  beforeEach(() => {
    reviewsModule = new ReviewsModule();
  });

  it('should create an instance', () => {
    expect(reviewsModule).toBeTruthy();
  });
});
