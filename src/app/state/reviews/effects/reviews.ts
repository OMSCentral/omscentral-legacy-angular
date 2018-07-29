import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, flatMap } from 'rxjs/operators';
import { ReviewService } from '../../../core/review.service';
import {
  LOAD_REVIEW,
  LOAD_REVIEWS,
  LoadReview,
  LoadReviews,
  LoadReviewsSuccess,
  LoadReviewSuccess,
  ProcessFilters,
  PROCESS_FILTERS,
  ProcessFiltersSuccess,
  SelectReview,
  SELECT_REVIEW,
  LOAD_RECENT_REVIEWS,
  LoadRecentReviews,
  LoadRecentReviewsSuccess,
  LOAD_USER_REVIEWS,
  LoadUserReviews,
  LoadUserReviewsSuccess,
} from '../actions/reviews';

@Injectable()
export class ReviewsEffects {
  @Effect()
  loadReviews: Observable<Action> = this.actions
    .ofType<LoadReviews>(LOAD_REVIEWS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.reviewService.getReviews(payload.reviews)),
      flatMap(reviews => [
        new LoadReviewsSuccess(reviews),
        new ProcessFilters(reviews),
      ])
    );

  @Effect()
  loadUserReviews: Observable<Action> = this.actions
    .ofType<LoadUserReviews>(LOAD_USER_REVIEWS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.reviewService.getReviews(payload.reviews)),
      flatMap(reviews => [new LoadUserReviewsSuccess(reviews)])
    );

  @Effect()
  loadRecentReviews: Observable<Action> = this.actions
    .ofType<LoadRecentReviews>(LOAD_RECENT_REVIEWS)
    .pipe(
      switchMap(payload => this.reviewService.getRecentReviews()),
      map(reviews => {
        return new LoadRecentReviewsSuccess(reviews);
      })
    );

  @Effect()
  processFilters: Observable<Action> = this.actions
    .ofType<ProcessFilters>(PROCESS_FILTERS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.reviewService.processFilters(payload)),
      map(filters => new ProcessFiltersSuccess(filters))
    );

  @Effect()
  selectReview: Observable<Action> = this.actions
    .ofType<SelectReview>(SELECT_REVIEW)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.reviewService.getReview(payload)),
      map(review => new LoadReviewSuccess(review))
    );

  @Effect()
  loadReview: Observable<Action> = this.actions
    .ofType<LoadReview>(LOAD_REVIEW)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.reviewService.getReview(payload.id)),
      map(review => new LoadReviewSuccess(review))
    );

  constructor(private actions: Actions, private reviewService: ReviewService) {}
}
