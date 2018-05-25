import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, flatMap, tap } from 'rxjs/operators';
import { ReviewService } from '../../../reviews/review.service';
import {
  LOAD_REVIEW,
  LOAD_REVIEWS,
  LoadReview,
  LoadReviews,
  LoadReviewsSuccess,
  LoadReviewSuccess,
  ProcessStats,
  ProcessFilters,
  PROCESS_FILTERS,
  ProcessFiltersSuccess,
  NewReview,
  NEW_REVIEW,
  NewReviewSuccess,
  SelectReview,
  SELECT_REVIEW,
  EditReview,
  EDIT_REVIEW,
  EditReviewSuccess,
  EDIT_REVIEW_SUCCESS,
  NEW_REVIEW_SUCCESS,
  RemoveReview,
  REMOVE_REVIEW,
  RemoveReviewSuccess,
  REMOVE_REVIEW_SUCCESS,
  LOAD_RECENT_REVIEWS,
  LoadRecentReviews,
  LoadRecentReviewsSuccess,
} from '../actions/reviews';
import { Router } from '@angular/router';

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

  @Effect()
  newReview: Observable<Action> = this.actions
    .ofType<NewReview>(NEW_REVIEW)
    .pipe(
      map(action => action.payload),
      switchMap(review => this.reviewService.push(review)),
      map(review => new NewReviewSuccess(review))
    );

  @Effect()
  editReview: Observable<Action> = this.actions
    .ofType<EditReview>(EDIT_REVIEW)
    .pipe(
      map(action => action.payload),
      switchMap(review => this.reviewService.update(review)),
      map(review => new EditReviewSuccess(review))
    );

  @Effect()
  removeReview: Observable<Action> = this.actions
    .ofType<RemoveReview>(REMOVE_REVIEW)
    .pipe(
      map(action => action.payload),
      switchMap(review => this.reviewService.remove(review)),
      map(review => new RemoveReviewSuccess(review))
    );

  @Effect({ dispatch: false })
  editReviewSuccess = this.actions
    .ofType<EditReviewSuccess>(EDIT_REVIEW_SUCCESS)
    .pipe(
      map(action => action.payload),
      tap(review => {
        this.router.navigate(['/courses', review.course]);
      })
    );

  @Effect({ dispatch: false })
  newReviewSuccess = this.actions
    .ofType<NewReviewSuccess>(NEW_REVIEW_SUCCESS)
    .pipe(
      map(action => action.payload),
      tap(review => {
        this.router.navigate(['/courses', review.course]);
      })
    );

    @Effect({ dispatch: false })
    removeReviewSuccess = this.actions
      .ofType<NewReviewSuccess>(REMOVE_REVIEW_SUCCESS)
      .pipe(
        map(action => action.payload),
        tap(review => {
          this.router.navigate(['/courses', review.course]);
        })
      );

  constructor(
    private actions: Actions,
    private reviewService: ReviewService,
    private router: Router
  ) {}
}
