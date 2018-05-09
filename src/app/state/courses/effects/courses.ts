import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CourseService } from '../../../courses/course.service';
import {
  LOAD_COURSE, LOAD_COURSES, LoadCourse, LoadCourses, LoadCoursesSuccess, LoadCourseSuccess
} from '../actions/courses';


@Injectable()
export class CoursesEffects {

  @Effect()
  loadCourses: Observable<Action> = this.actions.ofType<LoadCourses>(LOAD_COURSES)
    .pipe(
      switchMap(() => this.coursesService.getCourses()),
      map(courses => {
          return new LoadCoursesSuccess(courses);
        })
    );

  @Effect()
  loadCourse: Observable<Action> = this.actions.ofType<LoadCourse>(LOAD_COURSE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.coursesService.getCourse(payload.id)),
      map(course => new LoadCourseSuccess(course))
    );

  constructor(private actions: Actions,
              private coursesService: CourseService) {
  }

}