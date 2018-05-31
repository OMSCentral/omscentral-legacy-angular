import { ReviewSortPipe } from './review-sort.pipe';

describe('ReviewSortPipe', () => {
  it('create an instance', () => {
    const pipe = new ReviewSortPipe(null);
    expect(pipe).toBeTruthy();
  });
});
