import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Review, ReviewFilter } from '../../../models/review';
import {
  LOAD_REVIEW_SUCCESS,
  LOAD_REVIEWS_SUCCESS,
  ReviewsAction,
  SELECT_REVIEW,
  PROCESS_FILTERS_SUCCESS,
  UPDATE_PROGRAM_FILTER,
  UPDATE_SEMESTER_FILTER,
  UPDATE_DIFFICULTY_FILTER,
  UPDATE_RATING_FILTER,
  LOAD_REVIEWS,
  NEW_REVIEW_SUCCESS,
  EDIT_REVIEW_SUCCESS,
  REMOVE_REVIEW_SUCCESS,
  LOAD_RECENT_REVIEWS,
  LOAD_RECENT_REVIEWS_SUCCESS,
  LOAD_USER_REVIEWS_SUCCESS,
  LOAD_USER_REVIEWS,
} from '../actions/reviews';

export interface State extends EntityState<Review> {
  selectedId: string | null;
  selectedIds: string[] | null;
  recentIds: string[] | null;
  userIds: string[] | null;
  semesters: object;
  difficulties: object;
  ratings: object;
  programs: object;
}

export const adapter: EntityAdapter<Review> = createEntityAdapter();

const initialState: State = adapter.getInitialState({
  selectedId: null,
  selectedIds: null,
  recentIds: null,
  userIds: null,
  semesters: {},
  difficulties: {},
  ratings: {},
  programs: {},
});

export function reducer(state: State = initialState, action: ReviewsAction) {
  switch (action.type) {
    case LOAD_REVIEWS:
      if (action.payload.reviews) {
        let reviewIds = Object.keys(action.payload.reviews).filter(rev => {
          return action.payload.reviews[rev];
        });
        return { ...state, selectedIds: reviewIds };
      } else {
        return { ...state };
      }
    case LOAD_USER_REVIEWS:
      if (action.payload.reviews) {
        let userIds = Object.keys(action.payload.reviews).filter(rev => {
          return action.payload.reviews[rev];
        });
        return { ...state, userIds: userIds };
      } else {
        return {
          ...state,
        };
      }
    case LOAD_RECENT_REVIEWS_SUCCESS:
      let recentIds = action.payload.map(review => {
        return review.id;
      });
      return adapter.addMany(action.payload, {
        ...state,
        recentIds: recentIds,
      });
    case NEW_REVIEW_SUCCESS:
      return adapter.addOne(action.payload, state);
    case EDIT_REVIEW_SUCCESS:
      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload,
        },
        state
      );
    case LOAD_REVIEW_SUCCESS:
      return adapter.addOne(action.payload, state);
    case LOAD_REVIEWS_SUCCESS:
      return adapter.addMany(action.payload, state);
    case LOAD_USER_REVIEWS_SUCCESS:
      return adapter.addMany(action.payload, state);
    case SELECT_REVIEW:
      return {
        ...state,
        selectedId: action.payload,
      };
    case REMOVE_REVIEW_SUCCESS:
      return adapter.removeOne(action.payload.id, state);
    case PROCESS_FILTERS_SUCCESS:
      return {
        ...state,
        semesters: action.payload.semesters,
        difficulties: action.payload.difficulties,
        ratings: action.payload.ratings,
        programs: action.payload.programs,
      };
    case UPDATE_PROGRAM_FILTER:
      let programs = {};
      Object.keys(state.programs).forEach(pro => {
        programs[pro] = {
          id: pro,
          selected: action.payload.indexOf(pro) !== -1,
          disabled: false,
        };
      });
      return {
        ...state,
        programs,
      };
    case UPDATE_SEMESTER_FILTER:
      let semesters = {};
      Object.keys(state.semesters).forEach(sem => {
        semesters[sem] = {
          id: sem,
          selected: action.payload.indexOf(sem) !== -1,
          disabled: false,
        };
      });
      return {
        ...state,
        semesters,
      };
    case UPDATE_DIFFICULTY_FILTER:
      let difficulties = {};
      Object.keys(state.difficulties).forEach(dif => {
        difficulties[dif] = {
          id: dif,
          selected: action.payload.indexOf(dif) !== -1,
          disabled: false,
        };
      });
      return {
        ...state,
        difficulties,
      };
    case UPDATE_RATING_FILTER:
      let ratings = {};
      Object.keys(state.ratings).forEach(rat => {
        ratings[rat] = {
          id: rat,
          selected: action.payload.indexOf(rat) !== -1,
          disabled: false,
        };
      });
      return {
        ...state,
        ratings,
      };
    default:
      return state;
  }
}

export const getSelectedReviewId = (state: State) => state.selectedId;
export const getSelectedReviewIds = (state: State) => state.selectedIds;
export const getUserReviewIds = (state: State) => state.userIds;
export const getRecentIds = (state: State) => state.recentIds;
export const getProgramFilters = (state: State) => state.programs;
export const getSemesterFilters = (state: State) => state.semesters;
export const getDifficultyFilters = (state: State) => state.difficulties;
export const getRatingFilters = (state: State) => state.ratings;
export const getFilters = (state: State) => {
  const filter: ReviewFilter = {
    semesters: state.semesters,
    programs: state.programs,
    difficulties: state.difficulties,
    ratings: state.ratings,
  };
  return filter;
};
