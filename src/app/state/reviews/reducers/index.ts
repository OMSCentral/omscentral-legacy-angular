import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.interfaces';
import * as fromReviews from './reviews';

const filters = ['ii', 'ml', 'cpr', 'cs'];

export interface ReviewsState {
  reviews: fromReviews.State;
}

export interface State extends AppState {
  reviews: ReviewsState;
}

export const reducers = {
  reviews: fromReviews.reducer
};

export const getReviewsState = createFeatureSelector<ReviewsState>('reviews');

export const getReviewsEntityState = createSelector(
  getReviewsState,
  (state) => state.reviews
);

export const getFilter = createSelector(
  getReviewsEntityState,
  fromReviews.getFilter
);

export const getSelectedReviewId = createSelector(
  getReviewsEntityState,
  fromReviews.getSelectedReviewId
);

export const {
  selectAll: getAllReviews,
  selectEntities: getReviewEntities,
  selectIds: getReviewIds,
  selectTotal: getReviewsTotal
} = fromReviews.adapter.getSelectors(getReviewsEntityState);

export const getFilterReviews = createSelector(
  getReviewEntities,
  getFilter,
  (reviews, filter) => {
    return reviews;
  }
);

export const getSelectedReview = createSelector(
  getReviewEntities,
  getSelectedReviewId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);