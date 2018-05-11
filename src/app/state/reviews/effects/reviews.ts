import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, flatMap } from 'rxjs/operators';
import { ReviewService } from '../../../reviews/review.service';
import {
  LOAD_REVIEW, LOAD_REVIEWS, LoadReview, LoadReviews, LoadReviewsSuccess, LoadReviewSuccess, ProcessStats, ProcessFilters, PROCESS_FILTERS, ProcessFiltersSuccess,
} from '../actions/reviews';


@Injectable()
export class ReviewsEffects {

  @Effect()
  loadReviews: Observable<Action> = this.actions.ofType<LoadReviews>(LOAD_REVIEWS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.reviewService.getReviews(payload.reviews)),
      flatMap(reviews => [
          new LoadReviewsSuccess(reviews),
          new ProcessFilters(reviews)
      ])
    );

  @Effect()
  processFilters: Observable<Action> = this.actions.ofType<ProcessFilters>(PROCESS_FILTERS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.reviewService.processFilters(payload)),
      map(filters => new ProcessFiltersSuccess(filters))
    );

  @Effect()
  loadReview: Observable<Action> = this.actions.ofType<LoadReview>(LOAD_REVIEW)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.reviewService.getReview(payload.id)),
      map(review => new LoadReviewSuccess(review))
    );

  constructor(private actions: Actions,
              private reviewService: ReviewService) {
  }

}