import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { LocalStorageService } from '../core/local-storage.service';
import { SettingsService } from '../core/settings.service';

import * as jsonData from '../../../courses.json';
import { GradeService } from '../grades/grade.service';

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
  cached = {};
  cacheTime: number = null;
  courses$: BehaviorSubject<any> = new BehaviorSubject([]);
  course$: BehaviorSubject<any> = new BehaviorSubject({});
  courseIds: string[] = [];
  courseId: string;
  coursesBasic = jsonData;

  constructor(
    private db: AngularFireDatabase,
    private localStorageService: LocalStorageService,
    private settingsService: SettingsService,
    private gradeService: GradeService
  ) {
    this.cached = localStorageService.getObject('courses') || {};
    const cacheTime = localStorageService.get('coursesCacheTime');
    if (cacheTime !== null || cacheTime !== 'null') {
      this.cacheTime = new Date(Number(cacheTime)).valueOf();
    } else {
      this.cacheTime = null;
    }
  }

  addReview(courseId, reviewId) {
    const course = this.cached[courseId];
    if (!course.reviews) {
      course.reviews = {};
    }
    course.reviews[reviewId] = true;
    const temp = {};
    temp[courseId] = course;
    this.cached = Object.assign(this.cached, temp);
    // this.broadcast();
  }

  removeReview(courseId, reviewId) {
    delete this.cached[courseId].reviews[reviewId];
    // this.broadcast();
  }

  broadcast() {
    this.localStorageService.setObject('courses', this.cached);
    if (this.courseIds.length === 0) {
      this.courseIds = Object.keys(this.cached);
    }
    if (!this.courses$) {
      this.courses$ = new BehaviorSubject([]);
    }
    this.courses$.next(
      this.courseIds.map(courseId => {
        return this.cached[courseId] || {};
      })
    );
    this.course$.next(this.cached[this.courseId] || {});
  }

  processCourse(course, firebaseCourse, grades) {
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
    this.db.database
      .ref('/courses')
      .once('value')
      .then(snapshot => {
        const courses = jsonData;
        const firebaseCourses = snapshot.val();

        Object.keys(firebaseCourses).forEach(courseId => {
          if (jsonData[courseId]) {
            courses[courseId] = this.processCourse(
              courses[courseId],
              firebaseCourses[courseId],
              grades
            );
          }
        });
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

  updateCounts(courseId, reviews) {
    let difficulty = 0;
    let diffNum = 0;
    let rating = 0;
    let ratingNum = 0;
    let workload = 0;
    let workNum = 0;
    const updateReviews = reviews.filter(rev => {
      return rev && rev !== null;
    });
    updateReviews.forEach(review => {
      if (review) {
        if (review.difficulty) {
          difficulty += parseInt(review.difficulty, 10);
          diffNum++;
        }
        if (review.rating) {
          rating += parseInt(review.rating, 10);
          ratingNum++;
        }
        if (review.workload) {
          workload += parseInt(review.workload, 10);
          workNum++;
        }
      }
    });
    const update = {
      difficulty: difficulty / diffNum,
      rating: rating / ratingNum,
      workload: workload / workNum,
    };
    this.cached[courseId].average = update;
    this.cached[courseId].numReviews = updateReviews.length;
    this.localStorageService.setObject('courses', this.cached);
    return this.cached[courseId];
  }

  courseList() {
    const courses = Object.keys(this.cached).map(courseId => {
      return this.cached[courseId];
    });
    return courses;
  }

  getCourseName(courseId) {
    if (this.cached[courseId]) {
      return this.cached[courseId].name;
    } else {
      return '';
    }
  }

  getCourses() {
    if (this.cacheExpired()) {
      this.downloadCourses();
    } else {
      this.courseIds = Object.keys(this.cached);
      // this.broadcast();
    }
    return this.courses$.asObservable();
  }

  getCourse(courseId) {
    return this.downloadCourse(courseId);
  }

  push(course: any) {
    const newCourse = {
      average: {
        difficulty: null,
        rating: null,
        workload: null,
      },
      reviews: {},
    };
    const postRef: any = this.db.database
      .ref('/courses/' + course.number)
      .set(newCourse)
      .then(
        res => {
          return res;
        },
        err => {
          console.log(err);
        }
      );
    this.courseIds.push(course.number);
    const temp = {};
    newCourse['id'] = course.number;
    temp[course.number] = newCourse;
    this.cached = Object.assign(this.cached, temp);
    // this.broadcast();
  }

  private cacheExpired() {
    if (!this.cacheTime || this.cacheTime === null) {
      return true;
    } else {
      if (
        new Date().valueOf() - this.cacheTime.valueOf() >=
        this.settingsService.cacheLength
      ) {
        this.cacheTime = null;
        this.localStorageService.set('coursesCacheTime', null);
        return true;
      } else {
        return false;
      }
    }
  }
}
