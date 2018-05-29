import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { LocalStorageService } from '../core/local-storage.service';
import { SettingsService } from '../core/settings.service';

import * as jsonData from '../../../courses.json';
import { GradeService } from '../grades/grade.service';
import { Course } from '../models/course';
import { Store, select } from '@ngrx/store';
import { CoursesState, getCourseEntities } from '../state/courses/reducers';
import { map, switchMap, take } from 'rxjs/operators';

const coursePrefixes = ['CS', 'MG', 'IS'];

const defaultGrades = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  f: 0,
  w: 0,
  ab: 0,
  cdf: 0,
  total: 0,
};

const specializations = {
  cpr: [
    'CS-6505',
    'CS-8803-GA',
    'CS-6601',
    'CS-7641',
    'CS-8803-GA',
    'CS-6475',
    'CS-6476',
    'CS-8803-001',
  ],
  cs: [
    'CS-6035',
    'CS-6210',
    'CSE-6220',
    'CS-8803-GA',
    'CS-6250',
    'CS-6290',
    'CS-6300',
    'CS-6400',
    'CS-6262',
    'CS-6310',
    'CS-6340',
    'CS-6506',
    'CS-6200',
    'CS-6291',
    'CS-6505',
  ],
  ii: [
    'CS-6300',
    'CS-6505',
    'CS-8803-GA',
    'CS-6601',
    'CS-7637',
    'CS-7641',
    'CS-6440',
    'CS-6460',
  ],
  ml: [
    'CS-6505',
    'CS-6476',
    'CS-8803-GA',
    'CS-7641',
    'CS-7642',
    'CS-8803-003',
    'CS-7646',
    'CSE-6242',
    'CSE-6250',
    'CSE-6250',
  ],
};

@Injectable()
export class CourseService {
  courses$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private db: AngularFireDatabase,
    private localStorageService: LocalStorageService,
    private settingsService: SettingsService,
    private gradeService: GradeService,
    private store: Store<CoursesState>
  ) {}

  processCourse(course, firebaseCourse, grades): Course {
    const courseId = course.id;
    course = Object.assign({}, course || {}, firebaseCourse || {});
    if (course.reviews) {
      const revs = Object.keys(course.reviews).filter(rev => {
        return course.reviews[rev] && course.reviews[rev] !== null;
      });
      course.numReviews = revs.length;
    } else {
      course.numReviews = 0;
    }

    course.combined = courseId + ': ' + course.name;
    if (grades[courseId]) {
      course.grades = grades[courseId];
    } else {
      if (grades[course.number]) {
        course.grades = grades[course.number];
      } else {
        course.grades = {
          totals: defaultGrades,
          percents: defaultGrades,
        };
      }
    }
    course.enrolled = course.grades.totals.total;
    course.work = course.average.workload;
    course.difficulty = course.average.difficulty;
    course.rating = course.average.rating;
    course.ab = course.grades.totals.ab;
    course.cdf = course.grades.totals.cdf;
    course.withdrew = course.grades.totals.w;
    course.cpr = specializations.cpr.indexOf(courseId) !== -1;
    course.cs = specializations.cs.indexOf(courseId) !== -1;
    course.ii = specializations.ii.indexOf(courseId) !== -1;
    course.ml = specializations.ml.indexOf(courseId) !== -1;
    return course;
  }

  downloadCourses() {
    const grades = this.gradeService.getGrades();
    return this.db.database
      .ref('/courses')
      .once('value')
      .then(snapshot => {
        const firebaseCourses = snapshot.val();

        let courses = Object.keys(firebaseCourses).map(courseId => {
          return this.processCourse(
            jsonData[courseId],
            firebaseCourses[courseId],
            grades
          );
        });
        this.courses$.next(courses);
        return courses;
      });
  }

  downloadCourse(courseId: string) {
    const grades = this.gradeService.getGrades();
    const department = courseId.substr(
      courseId.indexOf('-') + 1,
      courseId.length - courseId.indexOf('-') - 1
    );
    return this.db.database
      .ref('/courses/' + courseId)
      .once('value')
      .then(snapshot => {
        const firebaseCourse: any = snapshot.val();
        if (firebaseCourse !== null) {
          return this.processCourse(jsonData[courseId], firebaseCourse, grades);
        }
      });
  }

  getBasicCourses() {
    return jsonData;
  }

  checkCourse(courseId) {
    return this.store.pipe(
      select(getCourseEntities),
      map(entities => {
        return entities[courseId];
      }),
      switchMap(review => {
        console.log(review);
        if (!!review) {
          console.log('had course');
          return of(review);
        } else {
          console.log('no course');
          return this.downloadCourse(courseId);
        }
      }),
      take(1)
    );
  }

  getCourses() {
    this.downloadCourses();
    return this.courses$.asObservable();
  }

  getCourse(courseId) {
    return this.checkCourse(courseId);
  }

  getCourseName(courseId) {
    if (jsonData[courseId]) {
      return jsonData[courseId].name;
    } else {
      return '';
    }
  }
}
