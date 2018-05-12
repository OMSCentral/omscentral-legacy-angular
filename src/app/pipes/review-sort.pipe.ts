import { Pipe, PipeTransform } from '@angular/core';
import { Review } from '../models/review';
import { ReviewService } from '../reviews/review.service';

@Pipe({
  name: 'reviewSort'
})
export class ReviewSortPipe implements PipeTransform {

  constructor(private reviewService: ReviewService) {}

  transform(reviews: Review[], sortType: string, sortDir: boolean): any {
    if (sortType === 'semester') {
      return this.reviewService.sortBySemester(reviews, sortDir);
    } else {
      return this.reviewService.sortByDate(reviews, sortDir);
    }
  }

}
