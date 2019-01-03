import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.interfaces';
import * as fromCourses from './courses';

const specializations = ['ii', 'ml', 'cpr', 'cs'];

export interface CoursesState {
  courses: fromCourses.State;
}

export interface State extends AppState {
  courses: CoursesState;
}

export const reducers = {
  courses: fromCourses.reducer,
};

export const getCoursesState = createFeatureSelector<CoursesState>('courses');

export const getCoursesEntityState = createSelector(
  getCoursesState,
  state => state.courses
);

export const getSpecialization = createSelector(
  getCoursesEntityState,
  fromCourses.getSpecialization
);

export const getCoursesSort = createSelector(
  getCoursesEntityState,
  fromCourses.getCoursesSort
);

export const getSelectedCourseId = createSelector(
  getCoursesEntityState,
  fromCourses.getSelectedCourseId
);

export const {
  selectAll: getAllCourses,
  selectEntities: getCourseEntities,
  selectIds: getCourseIds,
  selectTotal: getCoursesTotal,
} = fromCourses.adapter.getSelectors(getCoursesEntityState);

export const getSpecializationCourses = createSelector(
  getCourseEntities,
  getSpecialization,
  (courses, specialization) => {
    if (specializations.indexOf(specialization) === -1) {
      return courses;
    } else {
      let specCourses = {};
      Object.keys(courses).forEach(courseId => {
        if (courses[courseId][specialization]) {
          specCourses[courseId] = courses[courseId];
        }
      });
      return specCourses;
    }
  }
);

export const getSelectedCourse = createSelector(
  getCourseEntities,
  getSelectedCourseId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
