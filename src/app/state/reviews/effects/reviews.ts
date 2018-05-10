import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ReviewService } from '../../../reviews/review.service';
import {
  LOAD_REVIEW, LOAD_REVIEWS, LoadReview, LoadReviews, LoadReviewsSuccess, LoadReviewSuccess
} from '../actions/reviews';


@Injectable()
export class ReviewsEffects {

  @Effect()
  loadReviews: Observable<Action> = this.actions.ofType<LoadReviews>(LOAD_REVIEWS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.reviewsService.getReviews(payload.ids)),
      map(reviews => {
          return new LoadReviewsSuccess(reviews);
        })
    );

  @Effect()
  loadReview: Observable<Action> = this.actions.ofType<LoadReview>(LOAD_REVIEW)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.reviewsService.getReview(payload.id)),
      map(review => new LoadReviewSuccess(review))
    );

  constructor(private actions: Actions,
              private reviewsService: ReviewService) {
  }

}