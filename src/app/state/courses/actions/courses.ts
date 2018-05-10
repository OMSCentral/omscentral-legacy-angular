import { Action } from '@ngrx/store';
import { Course } from '../../../models/course';
import { createActionType } from '../../shared/utils';

export const LOAD_COURSES = createActionType('LOAD_COURSES');
export const LOAD_COURSES_SUCCESS = createActionType('LOAD_COURSES_SUCCESS');
export const LOAD_COURSE = createActionType('LOAD_COURSE');
export const LOAD_COURSE_SUCCESS = createActionType('LOAD_COURSE_SUCCESS');
export const FILTER_COURSES = createActionType('FILTER_COURSES');

export class LoadCourses implements Action {
  readonly type = LOAD_COURSES;
}

export class LoadCoursesSuccess implements Action {
  readonly type = LOAD_COURSES_SUCCESS;

  constructor(public payload: Course[]) {}
}

export class LoadCourse implements Action {
    readonly type = LOAD_COURSE;

    constructor(public payload: { id: number }) {
    }
  }

  export class LoadCourseSuccess implements Action {
    readonly type = LOAD_COURSE_SUCCESS;

    constructor(public payload: Course) {
    }
  }

  export class FilterCourses implements Action {
    readonly type = FILTER_COURSES;

    constructor(public payload: string) {}
  }


export type CoursesAction =
  LoadCourses
  | LoadCoursesSuccess
  | LoadCourse
  | LoadCourseSuccess
  | FilterCourses;