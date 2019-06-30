import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { LocalStorageService } from './local-storage.service';
import { SettingsService } from './settings.service';

import jsonData from '../../../courses.json';
import { GradeService } from './grade.service';
import { Course } from '../models/course';
import { Store, select } from '@ngrx/store';
import { CoursesState, getCourseEntities } from '../state/courses/reducers';
import { map, switchMap, take } from 'rxjs/operators';
import { Specialization, Choice } from '../models/specialization';

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

const specializations = [
  new Specialization('Computational Perception and Robotics', 'cpr', [
    new Choice(1, ['CS-6505', 'CS-8803-GA', 'CS-6515']),
    new Choice(1, ['CS-6601', 'CS-7641']),
    new Choice(3, ['CS-6475', 'CS-6476', 'CS-7638', 'CS-8803-009', 'CS-7639']),
  ]),
  new Specialization('Computing Systems', 'cs', [
    new Choice(1, ['CS-6505', 'CS-8803-GA', 'CS-6515']),
    new Choice(2, ['CS-6210', 'CS-6250', 'CS-6290', 'CS-6300', 'CS-6400']),
    new Choice(3, [
      'CS-6035',
      'CS-6200',
      'CS-6262',
      'CS-6291',
      'CS-6310',
      'CS-6340',
      'CSE-6220',
    ]),
  ]),
  new Specialization('Interactive Intelligence', 'ii', [
    new Choice(1, ['CS-6300', 'CS-6505', 'CS-8803-GA', 'CS-6515']),
    new Choice(2, ['CS-6601', 'CS-7637', 'CS-7641']),
    new Choice(2, ['CS-6440', 'CS-6460', 'CS-6750']),
  ]),
  new Specialization('Machine Learning', 'ml', [
    new Choice(1, ['CS-6505', 'CS-8803-GA', 'CS-6515']),
    new Choice(1, ['CS-7641']),
    new Choice(3, ['CS-7642', 'CS-7646', 'CS-6476', 'CSE-6242', 'CSE-6250']),
  ]),
];

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

  getSpecializations() {
    return specializations;
  }

  processCourse(course, firebaseCourse, grades): Course {
    if (course) {
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
      specializations.forEach(speciailization => {
        course[speciailization.short] = speciailization.contains(courseId);
      });
      return course;
    }
  }

  downloadCourses() {
    const grades = this.gradeService.getGrades();
    return this.db.database
      .ref('/courses')
      .once('value')
      .then(snapshot => {
        const firebaseCourses = snapshot.val();

        let courses = Object.keys(firebaseCourses || {}).map(courseId => {
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

  courseExists(courseId) {
    return Object.keys(jsonData).indexOf(courseId) !== -1;
  }

  checkCourse(courseId) {
    return this.store.pipe(
      select(getCourseEntities),
      map(entities => {
        return entities[courseId];
      }),
      switchMap(review => {
        if (!!review) {
          return of(review);
        } else {
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
