import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// temporary
import * as jsonData from '../../../merged-dev.json';

@Injectable()
export class CourseService {
  cached = {};
  cacheTime: Date = null;

  constructor() {}

  downloadCourses() {
    const courses = (<any>jsonData).courses;
    Object.keys(courses).forEach(courseId => {
      courses[courseId].numReviews = Object.keys(courses[courseId].reviews).length;
      courses[courseId].id = courseId;
    });
    this.cached = Object.assign(this.cached, courses);
    return this.courseList();
  }

  downloadCourse(courseId) {
    const course = (<any>jsonData).courses[courseId];
    course.numReviews = Object.keys(course.reviews).length;
    course.id = courseId;
    const temp = {};
    temp[courseId] = course;
    this.cached = Object.assign(this.cached, temp);
    return course;
  }

  courseList() {
    const courses = Object.keys(this.cached).map(courseId => {
      return this.cached[courseId];
    });
    return courses;
  }

  getCourses() {
    if (Object.keys(this.cached).length === 0 || this.cacheExpired()) {
      return Observable.of(this.downloadCourses());
    } else {
      return Observable.of(this.courseList());
    }
  }

  getCourse(courseId) {
    if (Object.keys(this.cached).indexOf(courseId) === -1 || this.cacheExpired()) {
      return Observable.of(this.downloadCourse(courseId));
    } else {
      return Observable.of(this.cached[courseId]);
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
