import { Action, UPDATE } from '@ngrx/store';
import { Review, ReviewFilter } from '../models/review';
import { createActionType } from '../state/shared/utils';

export const NEW_REVIEW = createActionType('NEW_REVIEW');
export const NEW_REVIEW_SUCCESS = createActionType('NEW_REVIEW_SUCCESS');
export const EDIT_REVIEW = createActionType('EDIT_REVIEW');
export const EDIT_REVIEW_SUCCESS = createActionType('EDIT_REVIEW_SUCCESS');
export const REMOVE_REVIEW = createActionType('REMOVE_REVIEW');
export const REMOVE_REVIEW_SUCCESS = createActionType('REMOVE_REVIEW_SUCCESS');

export class NewReview implements Action {
  readonly type = NEW_REVIEW;

  constructor(public payload: Review) {}
}

export class NewReviewSuccess implements Action {
  readonly type = NEW_REVIEW_SUCCESS;

  constructor(public payload: Review) {}
}

export class EditReview implements Action {
  readonly type = EDIT_REVIEW;

  constructor(public payload: Review) {}
}

export class EditReviewSuccess implements Action {
  readonly type = EDIT_REVIEW_SUCCESS;

  constructor(public payload: Review) {}
}

export class RemoveReview implements Action {
  readonly type = REMOVE_REVIEW;

  constructor(public payload: Review) {}
}

export class RemoveReviewSuccess implements Action {
  readonly type = REMOVE_REVIEW_SUCCESS;

  constructor(public payload: Review) {}
}

export type AuthedReviewsAction =
  | NewReview
  | NewReviewSuccess
  | EditReview
  | EditReviewSuccess
  | RemoveReview
  | RemoveReviewSuccess;
