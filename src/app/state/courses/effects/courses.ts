import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, flatMap } from 'rxjs/operators';
import { CourseService } from '../../../courses/course.service';
import {
  LOAD_COURSE,
  LOAD_COURSES,
  LoadCourse,
  LoadCourses,
  LoadCoursesSuccess,
  LoadCourseSuccess,
  SelectCourse,
  SELECT_COURSE,
} from '../actions/courses';
import { LoadReviews } from '../../reviews/actions/reviews';

@Injectable()
export class CoursesEffects {
  @Effect()
  loadCourses: Observable<Action> = this.actions
    .ofType<LoadCourses>(LOAD_COURSES)
    .pipe(
      switchMap(() => this.coursesService.getCourses()),
      map(courses => {
        return new LoadCoursesSuccess(courses);
      })
    );

  @Effect()
  selectCourse: Observable<Action> = this.actions
    .ofType<SelectCourse>(SELECT_COURSE)
    .pipe(map(action => new LoadCourse({id: action.payload})));

  @Effect()
  loadCourse: Observable<Action> = this.actions
    .ofType<LoadCourse>(LOAD_COURSE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.coursesService.getCourse(payload.id)),
      map(course => {
        console.log(course);
        return course;
      }),
      flatMap(course => [
        new LoadCourseSuccess(course),
        new LoadReviews({ reviews: course.reviews }),
      ])
    );

  constructor(
    private actions: Actions,
    private coursesService: CourseService
  ) {}
}
