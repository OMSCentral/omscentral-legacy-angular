import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from '../core/local-storage.service';
import { SettingsService } from '../core/settings.service';

import * as jsonData from '../../../courses.json';

const coursePrefixes = [
  'CS',
  'MG',
  'IS'
];

@Injectable()
export class CourseService {
  cached = {};
  cacheTime: number = null;
  courses$: BehaviorSubject<any> = new BehaviorSubject([]);
  course$: BehaviorSubject<any> = new BehaviorSubject({});
  courseIds: string[] = [];
  courseId: string;
  coursesBasic = jsonData;

  constructor(private db: AngularFireDatabase, private localStorageService: LocalStorageService, private settingsService: SettingsService) {
    this.cached = localStorageService.getObject('courses') || {};
    const cacheTime = localStorageService.get('coursesCacheTime');
    if (cacheTime !== null || cacheTime !== 'null') {
      this.cacheTime = (new Date(Number(cacheTime))).valueOf();
    } else {
      this.cacheTime = null;
    }
  }

  processGrades(grades) {
    const totals = {};
    if (grades) {
      Object.keys(grades).forEach(grade => {
        Object.keys(grades[grade]).forEach(letter => {
          if (Object.keys(totals).indexOf(letter) !== -1) {
            totals[letter] += grades[grade][letter];
          } else {
            totals[letter] = grades[grade][letter];
          }
        });
      });
    }
    return totals;
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
    this.broadcast();
  }

  removeReview(courseId, reviewId) {
    delete this.cached[courseId].reviews[reviewId];
    this.broadcast();
  }

  broadcast() {
    this.localStorageService.setObject('courses', this.cached);
    if (this.courseIds.length === 0) {
      this.courseIds = Object.keys(this.cached);
    }
    if (!this.courses$) {
      this.courses$ = new BehaviorSubject([]);
    }
    this.courses$.next(this.courseIds.map(courseId => {
      return this.cached[courseId] || {};
    }));
    this.course$.next(this.cached[this.courseId] || {});
  }

  downloadCourses() {
    this.db.database.ref('/courses').once('value').then((snapshot) => {
      const courses = jsonData;
      const firebaseCourses = snapshot.val();
      Object.keys(firebaseCourses).forEach(courseId => {
        if (jsonData[courseId]) {
          courses[courseId] = Object.assign(jsonData[courseId] || {}, firebaseCourses[courseId] || {});
          if (courses[courseId].reviews) {
            const revs = Object.keys(courses[courseId].reviews).filter(rev => {
              return courses[courseId].reviews[rev] && courses[courseId].reviews[rev] !== null;
            });
            courses[courseId].numReviews = revs.length;
          } else {
            courses[courseId].numReviews = 0;
          }
          courses[courseId].id = courseId;
          courses[courseId].combined = courseId + ': ' + courses[courseId].name;
          if (courses[courseId].grades) {
            courses[courseId].totals = this.processGrades(courses[courseId].grades);
            courses[courseId].semesterGrades = Object.keys(courses[courseId].grades).map(semGrade => {
              const grade = courses[courseId].grades[semGrade];
              grade.semester = semGrade;
              return grade;
            });
          } else {
            courses[courseId].semesterGrades = [];
            courses[courseId].totals = {};
          }
        }
      });
      // console.log(this.cached);
      this.cached = courses;
      Object.keys(this.cached).forEach(cacheKey => {
        if (coursePrefixes.indexOf(cacheKey.substr(0, 2)) === -1) {
          delete this.cached[cacheKey];
        }
      });
      if (this.cacheTime === null) {
        this.cacheTime = (new Date()).valueOf();
        this.localStorageService.set('coursesCacheTime', this.cacheTime);
      }
      this.broadcast();
    });
  }

  downloadCourse(courseId) {
    const department = courseId.substr(courseId.indexOf('-') + 1, courseId.length - courseId.indexOf('-') - 1);
    return this.db.database.ref('/courses/' + courseId).once('value').then((snapshot) => {
      const firebaseCourse: any = snapshot.val();
      if (firebaseCourse !== null) {
        let course = jsonData[courseId];
        course = Object.assign(course || {}, firebaseCourse);
        course.numReviews = Object.keys(course.reviews || {}).length;
        const temp = {};
        temp[courseId] = course;
        this.cached = Object.assign(this.cached, temp);
        this.broadcast();
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
      workload: workload / workNum
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
      this.broadcast();
    }
    return this.courses$.asObservable();
  }

  getCourse(courseId) {
    this.course$.next(null);
    this.courseId = courseId;
    if (Object.keys(this.cached).indexOf(courseId) === -1 || this.cacheExpired()) {
      this.downloadCourse(courseId);
    } else {
      this.broadcast();
    }
    if (!this.course$) {
      this.course$ = new BehaviorSubject({});
    }
    return this.course$;
  }

  push(course: any) {
    const newCourse = {
      average: {
        difficulty: null,
        rating: null,
        workload: null
      },
      reviews: {}
    };
    const postRef: any = this.db.database.ref('/courses/' + course.number).set(newCourse).then((res) => {
      return res;
    }, (err) => {
      console.log(err);
    });
    this.courseIds.push(course.number);
    const temp = {};
    newCourse['id'] = course.number;
    temp[course.number] = newCourse;
    this.cached = Object.assign(this.cached, temp);
    this.broadcast();
  }

  private cacheExpired() {
    if (!this.cacheTime || this.cacheTime === null) {
      return true;
    } else {
      if ((new Date()).valueOf() - this.cacheTime.valueOf() >= this.settingsService.cacheLength) {
        this.cacheTime = null;
        this.localStorageService.set('coursesCacheTime', null);
        return true;
      } else {
        return false;
      }
    }
  }

}
