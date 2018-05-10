import { Action } from '@ngrx/store';
import { Review } from '../../../models/review';
import { createActionType } from '../../shared/utils';

export const LOAD_REVIEWS = createActionType('LOAD_REVIEWS');
export const LOAD_REVIEWS_SUCCESS = createActionType('LOAD_REVIEWS_SUCCESS');
export const LOAD_REVIEW = createActionType('LOAD_REVIEW');
export const LOAD_REVIEW_SUCCESS = createActionType('LOAD_REVIEW_SUCCESS');
export const FILTER_REVIEWS = createActionType('FILTER_REVIEWS');
export const SELECT_REVIEW = createActionType('SELECT_REVIEW');

export class LoadReviews implements Action {
  readonly type = LOAD_REVIEWS;

  constructor(public payload: { ids: string[] }) {}
}

export class LoadReviewsSuccess implements Action {
  readonly type = LOAD_REVIEWS_SUCCESS;

  constructor(public payload: Review[]) {}
}

export class LoadReview implements Action {
    readonly type = LOAD_REVIEW;

    constructor(public payload: { id: number }) {
    }
  }

  export class LoadReviewSuccess implements Action {
    readonly type = LOAD_REVIEW_SUCCESS;

    constructor(public payload: Review) {
    }
  }

  export class FilterReviews implements Action {
    readonly type = FILTER_REVIEWS;

    constructor(public payload: string) {}
  }

  export class SelectReview implements Action {
    readonly type = SELECT_REVIEW;

    constructor(public payload: string) {}
  }


export type ReviewsAction =
  LoadReviews
  | LoadReviewsSuccess
  | LoadReview
  | LoadReviewSuccess
  | FilterReviews
  | SelectReview;