import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { Review, ReviewFilter } from '../models/review';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../firebase/auth.service';
import { CourseService } from '../courses/course.service';
import { LocalStorageService } from '../core/local-storage.service';
import { QueryReference } from 'angularfire2/database/interfaces';
import { SettingsService } from '../core/settings.service';

// temporary
// import * as jsonData from '../../../merged-dev.json';

@Injectable()
export class ReviewService {
  review$: BehaviorSubject<Review> = new BehaviorSubject<Review>(null);
  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private courseService: CourseService,
    private localStorageService: LocalStorageService,
    private settingsService: SettingsService
  ) {}

  downloadReview(reviewId) {
    return this.db.database
      .ref('/reviews/' + reviewId)
      .once('value')
      .then(snapshot => {
        const review: Review = new Review(snapshot.val());
        review.id = reviewId;
        return review;
      });
  }

  push(review: Review) {
    const newReview = {
      // "author": "JCLHCu3hGhelwrRCG3fPsDdGKcK2",
      // "course": "8803-002",
      // "created": "2016-08-05T14:01:38Z",
      // "difficulty": 4,
      // "rating": 5,
      // "semester": "2015-3",
      // "text": "Very interesting topics. Very interesting programming assignments. ",
      // "updated": "2016-08-05T14:01:38Z",
      // "workload": 18
      created: new Date().getTime(),
      updated: new Date().getTime(),
      author: this.auth.authState.uid,
      course: review.course,
      difficulty: review.difficulty,
      semester: review.semester,
      text: review.text,
      workload: review.workload,
      rating: review.rating,
      program: review.program,
      proctortrack: review.proctortrack || '',
      firstCourse: review.firstCourse || '',
      previousClasses: review.previousClasses || '',
      projects: review.projects || '',
      groupProjects: review.groupProjects || '',
      tests: review.tests || '',
      extraCredit: review.extraCredit || '',
      moneySpent: review.moneySpent || '',
      frontLoad: review.frontLoad || '',
    };
    const postRef: any = this.db.database.ref('/reviews/').push(newReview);
    const refKey = postRef.key;
    const temp = {};
    newReview['id'] = refKey;
    temp[refKey] = new Review(newReview);
    // this.cached = Object.assign(this.cached, temp);
    // this.broadcast();

    // Add review to course cache
    // this.courseService.addReview(review.course, postRef.key);
  }

  update(review: Review) {
    const updatedReview: any = {
      // "author": "JCLHCu3hGhelwrRCG3fPsDdGKcK2",
      // "course": "8803-002",
      // "created": "2016-08-05T14:01:38Z",
      // "difficulty": 4,
      // "rating": 5,
      // "semester": "2015-3",
      // "text": "Very interesting topics. Very interesting programming assignments. ",
      // "updated": "2016-08-05T14:01:38Z",
      // "workload": 18
      created: review.created || new Date().getTime(),
      updated: new Date().getTime(),
      author: this.auth.authState.uid,
      course: review.course,
      difficulty: review.difficulty,
      semester: review.semester,
      text: review.text,
      workload: review.workload,
      rating: review.rating,
      program: review.program,
      proctortrack: review.proctortrack || '',
      firstCourse: review.firstCourse || '',
      previousClasses: review.previousClasses || '',
      projects: review.projects || '',
      groupProjects: review.groupProjects || '',
      tests: review.tests || '',
      extraCredit: review.extraCredit || '',
      moneySpent: review.moneySpent || '',
      frontLoad: review.frontLoad || '',
    };
    const postRef = this.db.database
      .ref('/reviews/' + review.id)
      .set(updatedReview);
    const temp = {};
    updatedReview.id = review.id;
    temp[review.id] = new Review(updatedReview);
    // this.cached = Object.assign(this.cached, temp);
  }

  remove(review) {
    this.db.database.ref('/reviews/' + review.id).remove();
  }

  // getReviewsByAuthor(authorId: string) {
  //   this.db.database
  //     .ref('/reviews')
  //     .orderByChild('author')
  //     .equalTo(authorId)
  //     .once('value')
  //     .then(snapshot => {
  //       const reviewsObj = snapshot.val();
  //       const temp = {};

  //       if (reviewsObj) {
  //         this.reviewIds = Object.keys(reviewsObj);

  //         const reviews = Object.keys(reviewsObj).map(reviewId => {
  //           const review: Review = new Review(reviewsObj[reviewId]);
  //           review.id = reviewId;
  //           temp[reviewId] = review;
  //           return review;
  //         });

  //         this.cached = Object.assign(this.cached, temp);
  //         if (this.cacheTime === null) {
  //           this.cacheTime = new Date().valueOf();
  //         }

  //         this.reviews$.next(this.sortBySemester(reviews, false));
  //       } else {
  //         this.reviews$.next([]);
  //       }
  //     });
  //   return this.reviews$;
  // }

  // getRecentReviews() {
  //   if (this.recentSub === null) {
  //     this.recentSub = this.db.database
  //       .ref('/reviews')
  //       .orderByChild('created')
  //       .limitToLast(10);
  //     this.recentSub.on('value', snapshot => {
  //       const reviewsObj = snapshot.val();
  //       const reviews = Object.keys(reviewsObj)
  //         .map(reviewId => {
  //           const review: Review = new Review(reviewsObj[reviewId]);
  //           review.id = reviewId;
  //           return review;
  //         })
  //         .reverse();

  //       this.recent$.next(reviews);
  //     });
  //   }
  //   return this.recent$;
  // }

  processFilters(reviews: Review[]) {
    const filters: ReviewFilter = {
      semesters: {},
      difficulties: {},
      ratings: {},
      programs: {},
    };
    reviews.forEach(rev => {
      if (rev.semester && rev.semester !== '0000-0') {
        filters.semesters[rev.semester] = {
          id: rev.semester,
          selected: false,
          disabled: false,
        };
      }
      if (rev.difficulty) {
        filters.difficulties[rev.difficulty] = {
          id: rev.difficulty,
          selected: false,
          disabled: false,
        };
      }
      if (rev.rating) {
        filters.ratings[rev.rating] = {
          id: rev.rating,
          selected: false,
          disabled: false,
        };
      }
      if (rev.program) {
        filters.programs[rev.program] = {
          id: rev.program,
          selected: false,
          disabled: false,
        };
      }
    });
    return Observable.of(filters);
  }

  getReview(reviewId) {
    return this.downloadReview(reviewId);
  }

  getReviews(reviews: object) {
    const revs = [];
    Object.keys(reviews).forEach(rev => {
      if (reviews[rev]) {
        revs.push(this.downloadReview(rev));
      }
    });
    return forkJoin(revs);
  }

  sortBySemester(reviews, rev = false) {
    let sorted = reviews.sort((a, b) => {
      if (a.author === this.auth.authState.uid) {
        return rev ? 1 : -1;
      } else {
        if (b.author === this.auth.authState.uid) {
          return rev ? -1 : 1;
        } else {
          const aData = a.semester.split('-');
          const aYear = parseInt(aData[0], 10);
          const aSem = parseInt(aData[1], 10);

          const bData = b.semester.split('-');
          const bYear = parseInt(bData[0], 10);
          const bSem = parseInt(bData[1], 10);
          if (aYear === bYear) {
            return bSem - aSem;
          } else {
            return bYear - aYear;
          }
        }
      }
    });

    if (rev) {
      sorted = sorted.reverse();
    }

    return sorted;
  }

  sortByDate(reviews, rev = false) {
    let sorted = reviews.sort((a, b) => {
      if (a.author === this.auth.authState.uid) {
        return rev ? 1 : -1;
      } else {
        if (b.author === this.auth.authState.uid) {
          return rev ? -1 : 1;
        } else {
          let aDate, bDate;
          if (a.updated) {
            aDate = new Date(a.updated);
          } else {
            aDate = new Date(a.created);
          }

          if (b.updated) {
            bDate = new Date(b.updated);
          } else {
            bDate = new Date(b.created);
          }

          return aDate - bDate;
        }
      }
    });

    if (rev) {
      sorted = sorted.reverse();
    }

    return sorted;
  }
}
