import { Action, UPDATE } from '@ngrx/store';
import { Review, ReviewFilter } from '../../../models/review';
import { createActionType } from '../../shared/utils';

export const LOAD_REVIEWS = createActionType('LOAD_REVIEWS');
export const LOAD_REVIEWS_SUCCESS = createActionType('LOAD_REVIEWS_SUCCESS');
export const LOAD_REVIEW = createActionType('LOAD_REVIEW');
export const LOAD_REVIEW_SUCCESS = createActionType('LOAD_REVIEW_SUCCESS');
export const UPDATE_PROGRAM_FILTER = createActionType('UPDATE_PROGRAM_FILTER');
export const UPDATE_SEMESTER_FILTER = createActionType('UPDATE_SEMESTER_FILTER');
export const UPDATE_RATING_FILTER = createActionType('UPDATE_RATING_FILTER');
export const UPDATE_DIFFICULTY_FILTER = createActionType('UPDATE_DIFFICULTY_FILTER');
export const PROCESS_STATS = createActionType('PROCESS_STATS');
export const PROCESS_FILTERS = createActionType('PROCESS_FILTERS');
export const PROCESS_FILTERS_SUCCESS = createActionType('PROCESS_FILTERS_SUCCESS');
export const SELECT_REVIEW = createActionType('SELECT_REVIEW');

export class LoadReviews implements Action {
  readonly type = LOAD_REVIEWS;

  constructor(public payload: { reviews: object }) {}
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

  export class SelectReview implements Action {
    readonly type = SELECT_REVIEW;

    constructor(public payload: string) {}
  }

  export class ProcessFilters implements Action {
    readonly type = PROCESS_FILTERS;

    constructor(public payload: Review[]) {}
  }

  export class ProcessFiltersSuccess implements Action {
    readonly type = PROCESS_FILTERS_SUCCESS;

    constructor(public payload: ReviewFilter) {}
  }

  export class UpdateProgramFilter implements Action {
    readonly type = UPDATE_PROGRAM_FILTER;

    constructor(public payload: string[]) {}
  }

  export class UpdateSemesterFilter implements Action {
    readonly type = UPDATE_SEMESTER_FILTER;

    constructor(public payload: string[]) {}
  }

  export class UpdateRatingFilter implements Action {
    readonly type = UPDATE_RATING_FILTER;

    constructor(public payload: string[]) {}
  }

  export class UpdateDifficultyFilter implements Action {
    readonly type = UPDATE_DIFFICULTY_FILTER;

    constructor(public payload: string[]) {}
  }

  export class ProcessStats implements Action {
    readonly type = PROCESS_STATS;

    constructor(public payload: string) {}
  }


export type ReviewsAction =
  LoadReviews
  | LoadReviewsSuccess
  | LoadReview
  | LoadReviewSuccess
  | UpdateProgramFilter
  | UpdateSemesterFilter
  | UpdateDifficultyFilter
  | UpdateRatingFilter
  | SelectReview
  | ProcessFilters
  | ProcessFiltersSuccess
  | ProcessStats;