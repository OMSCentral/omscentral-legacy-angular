import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from '../core/local-storage.service';

@Injectable()
export class CourseService {
  cached = {};
  cacheTime: Date = null;
  courses$: BehaviorSubject<any> = new BehaviorSubject([]);
  course$: BehaviorSubject<any> = new BehaviorSubject({});
  courseIds: string[] = [];
  courseId: string;

  constructor(private db: AngularFireDatabase, private localStorageService: LocalStorageService) {
    this.cached = localStorageService.getObject('courses') || {};
    this.cacheTime = new Date(localStorageService.get('coursesCacheTime'));
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
    if (!this.course$) {
      this.course$ = new BehaviorSubject({});
    }
    this.courses$.next(this.courseIds.map(courseId => {
      return this.cached[courseId] || {};
    }));
    this.course$.next(this.cached[this.courseId] || {});
  }

  downloadCourses() {
    this.db.database.ref('/courses').once('value').then((snapshot) => {
      const courses = snapshot.val();
      Object.keys(courses).forEach(courseId => {
        if (courses[courseId].reviews) {
          const revs = Object.keys(courses[courseId].reviews).filter(rev => {
            return courses[courseId].reviews[rev] && courses[courseId].reviews[rev] !== null;
          });
          courses[courseId].numReviews = revs.length;
        } else {
          courses[courseId].numReviews = 0;
        }
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
      if (this.cacheTime === null) {
        this.cacheTime = new Date();
        this.localStorageService.set('coursesCacheTime', this.cacheTime);
      }
      this.broadcast();
    });
  }

  downloadCourse(courseId) {
    return this.db.database.ref('/courses/' + courseId).once('value').then((snapshot) => {
      const course: any = snapshot.val();
      course.numReviews = Object.keys(course.reviews || {}).length;
      course.id = courseId;
      const temp = {};
      temp[courseId] = course;
      this.cached = Object.assign(this.cached, temp);
      this.broadcast();
      return this.course$.asObservable();
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
      return this.downloadCourse(courseId);
    } else {
      this.broadcast();
      return this.course$.asObservable();
    }
  }

  push(course: any) {
    const newCourse = {
      average: {
        difficulty: null,
        rating: null,
        workload: null
      },
      department: course.department,
      foundational: course.foundational,
      icon: '',
      name: course.name,
      number: Number(course.number),
      program: course.program,
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
      if ((new Date()).valueOf() - this.cacheTime.valueOf() >= 24 * 60 * 60 * 1000) {
        this.cacheTime = null;
        this.localStorageService.set('coursesCacheTime', null);
        return true;
      } else {
        return false;
      }
    }
  }

}
