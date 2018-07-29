import { AuthedReviewsModule } from './authed-reviews.module';

describe('AuthedReviewsModule', () => {
  let authedReviewsModule: AuthedReviewsModule;

  beforeEach(() => {
    authedReviewsModule = new AuthedReviewsModule();
  });

  it('should create an instance', () => {
    expect(authedReviewsModule).toBeTruthy();
  });
});
