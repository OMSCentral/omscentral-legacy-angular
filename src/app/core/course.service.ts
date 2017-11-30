import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// temporary
import * as jsonData from '../../../merged-dev.json';

@Injectable()
export class CourseService {
  cached = {};
  cacheTime: Date = null;
  courses$: BehaviorSubject<any> = new BehaviorSubject([]);
  course$: BehaviorSubject<any> = new BehaviorSubject({});
  courseIds: string[] = [];
  courseId: string;

  constructor() {}

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
    if (!this.cached[courseId].reviews) {
      this.cached[courseId].reviews = {};
    }
    this.cached[courseId].reviews[reviewId] = true;
    this.broadcast();
  }

  broadcast() {
    if (!this.courses$) {
      this.courses$ = new BehaviorSubject([]);
    }
    if (!this.course$) {
      this.course$ = new BehaviorSubject({});
    }
    this.courses$.next(this.courseIds.map(courseId => {
      return this.cached[courseId] || {};
    }));
    this.course$.next(this.cached[this.courseId] || {});
  }

  downloadCourses() {
    const courses = (<any>jsonData).courses;
    this.courseIds = Object.keys(courses);
    Object.keys(courses).forEach(courseId => {
      courses[courseId].numReviews = Object.keys(courses[courseId].reviews).length;
      courses[courseId].id = courseId;
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
    });
    this.cached = Object.assign(this.cached, courses);
    this.broadcast();
    return this.courses$.asObservable();
  }

  downloadCourse(courseId) {
    const course = (<any>jsonData).courses[courseId];
    course.numReviews = Object.keys(course.reviews).length;
    course.id = courseId;
    const temp = {};
    temp[courseId] = course;
    this.cached = Object.assign(this.cached, temp);
    this.broadcast();
    return this.course$.asObservable();
  }

  courseList() {
    const courses = Object.keys(this.cached).map(courseId => {
      return this.cached[courseId];
    });
    return courses;
  }

  getCourses() {
    if (this.cacheExpired()) {
      return this.downloadCourses();
    } else {
      return this.courses$.asObservable();
    }
  }

  getCourse(courseId) {
    this.courseId = courseId;
    if (Object.keys(this.cached).indexOf(courseId) === -1 || this.cacheExpired()) {
      return this.downloadCourse(courseId);
    } else {
      return this.course$.asObservable();
    }
  }

  private cacheExpired() {
    if (this.cacheTime === null) {
      return true;
    } else {
      return (new Date()).valueOf() - this.cacheTime.valueOf() >= 24 * 60 * 60 * 1000;
    }
  }

}
