import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Review, ReviewFilter } from '../../../models/review';
import {
  LOAD_REVIEW_SUCCESS, LOAD_REVIEWS_SUCCESS, ReviewsAction, SELECT_REVIEW, PROCESS_FILTERS_SUCCESS, UPDATE_FILTER
} from '../actions/reviews';

export interface State extends EntityState<Review> {
  selectedId: string | null;
  selectedIds: string[] | null;
  semesters: object;
  difficulties: object;
  ratings: object;
  programs: object;
}

export const adapter: EntityAdapter<Review> = createEntityAdapter();

const initialState: State = adapter.getInitialState({
  selectedId: null,
  selectedIds: null,
  semesters: {},
  difficulties: {},
  ratings: {},
  programs: {}
});

export function reducer(state: State = initialState, action: ReviewsAction) {
  switch (action.type) {
    case LOAD_REVIEW_SUCCESS:
      return adapter.addOne(action.payload, state);
    case LOAD_REVIEWS_SUCCESS:
      return adapter.addMany(action.payload, state);
    case SELECT_REVIEW:
      return {
        ...state,
        selectedId: action.payload
      };
    case PROCESS_FILTERS_SUCCESS:
      return {
        ...state,
        semesters: action.payload.semesters,
        difficulties: action.payload.difficulties,
        ratings: action.payload.ratings,
        programs: action.payload.programs
      };
    case UPDATE_FILTER:
      return {
        ...state,
        semesters: action.payload.semesters,
        difficulties: action.payload.difficulties,
        ratings: action.payload.ratings,
        programs: action.payload.programs
      };
    default:
      return state;
  }
}

export const getSelectedReviewId = (state: State) => state.selectedId;
export const getFilters = (state: State) => {
  const filter: ReviewFilter = {
    semesters: state.semesters,
    programs: state.programs,
    difficulties: state.difficulties,
    ratings: state.ratings
  };
  return filter;
};