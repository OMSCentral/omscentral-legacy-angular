import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, flatMap, tap } from 'rxjs/operators';
import { AuthedReviewService } from './authed-review.service';
import {
  NewReview,
  NEW_REVIEW,
  EditReview,
  EDIT_REVIEW,
  RemoveReview,
  REMOVE_REVIEW,
  EDIT_REVIEW_SUCCESS,
  NEW_REVIEW_SUCCESS,
  EditReviewSuccess,
  NewReviewSuccess,
  REMOVE_REVIEW_SUCCESS,
  RemoveReviewSuccess,
} from './authed-review.actions';
import { Router } from '@angular/router';
import { AlertService } from '../core/alert.service';

@Injectable()
export class AuthedReviewEffects {
  @Effect()
  newReview: Observable<Action> = this.actions
    .ofType<NewReview>(NEW_REVIEW)
    .pipe(
      map(action => action.payload),
      switchMap(review => this.authedReviewService.push(review)),
      map(review => new NewReviewSuccess(review))
    );

  @Effect()
  editReview: Observable<Action> = this.actions
    .ofType<EditReview>(EDIT_REVIEW)
    .pipe(
      map(action => action.payload),
      switchMap(review => this.authedReviewService.update(review)),
      map(review => new EditReviewSuccess(review))
    );

  @Effect()
  removeReview: Observable<Action> = this.actions
    .ofType<RemoveReview>(REMOVE_REVIEW)
    .pipe(
      map(action => action.payload),
      switchMap(review => this.authedReviewService.remove(review)),
      map(review => new RemoveReviewSuccess(review))
    );

  @Effect({ dispatch: false })
  editReviewSuccess = this.actions
    .ofType<EditReviewSuccess>(EDIT_REVIEW_SUCCESS)
    .pipe(
      map(action => action.payload),
      tap(review => {
        this.alertService.addAlert('Review Saved');
        this.router.navigate(['/courses', review.course]);
      })
    );

  @Effect({ dispatch: false })
  newReviewSuccess = this.actions
    .ofType<NewReviewSuccess>(NEW_REVIEW_SUCCESS)
    .pipe(
      map(action => action.payload),
      tap(review => {
        this.alertService.addAlert(
          'Review Saved! It may take a moment to show up.'
        );
        this.router.navigate(['/courses', review.course]);
      })
    );

  @Effect({ dispatch: false })
  removeReviewSuccess = this.actions
    .ofType<RemoveReviewSuccess>(REMOVE_REVIEW_SUCCESS)
    .pipe(
      map(action => action.payload),
      tap(review => {
        this.alertService.addAlert('Review Deleted');
        this.router.navigate(['/courses', review.course]);
      })
    );

  constructor(
    private actions: Actions,
    private authedReviewService: AuthedReviewService,
    private router: Router,
    private alertService: AlertService
  ) {}
}
