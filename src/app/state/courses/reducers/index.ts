import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.interfaces';
import * as fromCourses from './courses';

export interface CoursesState {
  courses: fromCourses.State;
}

export interface State extends AppState {
  courses: CoursesState;
}

export const reducers = {
  courses: fromCourses.reducer
};

export const getCoursesState = createFeatureSelector<CoursesState>('courses');

export const getCoursesEntityState = createSelector(
  getCoursesState,
  (state) => state.courses
);

export const {
  selectAll: getAllCourses,
  selectEntities: getCourseEntities,
  selectIds: getCourseIds,
  selectTotal: getCoursesTotal
} = fromCourses.adapter.getSelectors(getCoursesEntityState);
