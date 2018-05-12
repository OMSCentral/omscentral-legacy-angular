import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.interfaces';
import * as fromReviews from './reviews';
import { CourseStats } from '../../../models/course';

const filters = ['ii', 'ml', 'cpr', 'cs'];

export interface ReviewsState {
  reviews: fromReviews.State;
}

export interface State extends AppState {
  reviews: ReviewsState;
}

export const reducers = {
  reviews: fromReviews.reducer,
};

export const getReviewsState = createFeatureSelector<ReviewsState>('reviews');

export const getReviewsEntityState = createSelector(
  getReviewsState,
  state => state.reviews
);

export const getSelectedReviewId = createSelector(
  getReviewsEntityState,
  fromReviews.getSelectedReviewId
);

export const getFilters = createSelector(
  getReviewsEntityState,
  fromReviews.getFilters
);

export const {
  selectAll: getAllReviews,
  selectEntities: getReviewEntities,
  selectIds: getReviewIds,
  selectTotal: getReviewsTotal,
} = fromReviews.adapter.getSelectors(getReviewsEntityState);

export const getSelectedReview = createSelector(
  getReviewEntities,
  getSelectedReviewId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

function semesterFilter(review, filters) {
  const semesters = Object.keys(filters.semesters).filter(sem => {
    return filters.semesters[sem].selected;
  });
  if (semesters.length === 0) {
    return true;
  } else {
    return semesters.indexOf(review.semester) !== -1;
  }
}

function difficultyFilter(review, filters) {
  const difficulties = Object.keys(filters.difficulties).filter(dif => {
    return filters.difficulties[dif].selected;
  });
  if (
    difficulties.length === 0
  ) {
    return true;
  } else {
    return difficulties.indexOf(String(review.difficulty)) !== -1;
  }
}

function ratingFilter(review, filters) {
  const ratings = Object.keys(filters.ratings).filter(rat => {
    return filters.ratings[rat].selected;
  });
  if (ratings.length === 0) {
    return true;
  } else {
    return ratings.indexOf(String(review.rating)) !== -1;
  }
}

function programFilter(review, filters) {
  const programs = Object.keys(filters.programs).filter(pro => {
    return filters.programs[pro].selected;
  });
  if (programs.length === 0) {
    return true;
  } else {
    return programs.indexOf(String(review.rating)) !== -1;
  }
}

export const getFilteredReviews = createSelector(
  getAllReviews,
  getFilters,
  (reviews, filters) => {
    const filtered = reviews.filter(review => {
      return (
        semesterFilter(review, filters) &&
        difficultyFilter(review, filters) &&
        ratingFilter(review, filters) &&
        programFilter(review, filters)
      );
    });
    // if (filtered.length === this.reviews.length) {
    //   this.stats = {
    //     num: null,
    //     workload: null,
    //     difficulty: null,
    //     rating: null,
    //   };
    //   if (this.sortType === 'date') {
    //     this.filtered = this.reviewService.sortByDate(
    //       this.reviews,
    //       this.sortDir
    //     );
    //   } else {
    //     this.filtered = this.reviewService.sortBySemester(
    //       this.reviews,
    //       this.sortDir
    //     );
    //   }
    // } else {
    //   let workload = 0;
    //   let worNum = 0;
    //   let rating = 0;
    //   let ratNum = 0;
    //   let difficulty = 0;
    //   let difNum = 0;
    //   filtered.forEach(rev => {
    //     if (rev.workload) {
    //       workload += Number(rev.workload);
    //       worNum++;
    //     }
    //     if (rev.rating) {
    //       rating += Number(rev.rating);
    //       ratNum++;
    //     }
    //     if (rev.difficulty) {
    //       difficulty += Number(rev.difficulty);
    //       difNum++;
    //     }
    //   });

    //   this.stats.num = filtered.length;

    //   if (worNum !== 0) {
    //     this.stats.workload = workload / worNum;
    //   } else {
    //     this.stats.workload = null;
    //   }

    //   if (ratNum !== 0) {
    //     this.stats.rating = rating / ratNum;
    //   } else {
    //     this.stats.rating = null;
    //   }

    //   if (difNum !== 0) {
    //     this.stats.difficulty = difficulty / difNum;
    //   } else {
    //     this.stats.difficulty = null;
    //   }

    //   if (this.sortType === 'date') {
    //     this.filtered = this.reviewService.sortByDate(filtered, this.sortDir);
    //   } else {
    //     this.filtered = this.reviewService.sortBySemester(
    //       filtered,
    //       this.sortDir
    //     );
    //   }
    // }
    return filtered;
  }
);

export const getFilteredStats = createSelector(
  getAllReviews,
  getFilteredReviews,
  (reviews, filtered) => {
    let stats: CourseStats = {
      num: null,
      workload: null,
      difficulty: null,
      rating: null,
    };
    if (filtered.length !== reviews.length) {
      let workload = 0;
      let worNum = 0;
      let rating = 0;
      let ratNum = 0;
      let difficulty = 0;
      let difNum = 0;
      filtered.forEach(rev => {
        if (rev.workload) {
          workload += Number(rev.workload);
          worNum++;
        }
        if (rev.rating) {
          rating += Number(rev.rating);
          ratNum++;
        }
        if (rev.difficulty) {
          difficulty += Number(rev.difficulty);
          difNum++;
        }
      });

      stats.num = filtered.length;

      if (worNum !== 0) {
        stats.workload = workload / worNum;
      } else {
        stats.workload = null;
      }

      if (ratNum !== 0) {
        stats.rating = rating / ratNum;
      } else {
        stats.rating = null;
      }

      if (difNum !== 0) {
        stats.difficulty = difficulty / difNum;
      } else {
        stats.difficulty = null;
      }
    }
    return stats;
  }
);
