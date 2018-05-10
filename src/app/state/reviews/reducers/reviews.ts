import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Review } from '../../../models/review';
import {
  LOAD_REVIEW_SUCCESS, LOAD_REVIEWS_SUCCESS, ReviewsAction, FILTER_REVIEWS, SELECT_REVIEW
} from '../actions/reviews';

export interface State extends EntityState<Review> {
  filter: object | null;
  selectedId: string | null;
}

export const adapter: EntityAdapter<Review> = createEntityAdapter();

const initialState: State = adapter.getInitialState({
  filter: null,
  selectedId: null
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
    case FILTER_REVIEWS:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

export const getFilter = (state: State) => state.filter;
export const getSelectedReviewId = (state: State) => state.selectedId;