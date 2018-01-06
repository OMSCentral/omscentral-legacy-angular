import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Review } from '../models/review';
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
  cached = {};
  cacheTime: number = null;
  reviews$: BehaviorSubject<any> = new BehaviorSubject([]);
  recent$: BehaviorSubject<any> = new BehaviorSubject([]);
  recentSub: QueryReference = null;
  reviewIds: string[];

  constructor(private db: AngularFireDatabase, private auth: AuthService,
    private courseService: CourseService, private localStorageService: LocalStorageService,
    private settingsService: SettingsService) {
    this.cached = localStorageService.getObject('reviews') || {};
    const cacheTime = localStorageService.get('reviewsCacheTime');
    if (cacheTime !== null || cacheTime !== 'null') {
      this.cacheTime = (new Date(Number(cacheTime))).valueOf();
    } else {
      this.cacheTime = null;
    }
  }

  downloadReview(reviewId) {
    return this.db.database.ref('/reviews/' + reviewId).once('value').then((snapshot) => {
      const review: Review = new Review(snapshot.val());
      review.id = reviewId;
      const temp = {};
      temp[reviewId] = review;
      this.cached = Object.assign(this.cached, temp);
      if (this.cacheTime === null) {
        this.cacheTime = (new Date()).valueOf();
      }
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
      program: review.program
    };
    const postRef: any = this.db.database.ref('/reviews/').push(newReview);
    const refKey = postRef.key;
    this.reviewIds.push(refKey);
    const temp = {};
    newReview['id'] = refKey;
    temp[refKey] = new Review(newReview);
    this.cached = Object.assign(this.cached, temp);
    this.broadcast();

    // Add review to course cache
    this.courseService.addReview(review.course, postRef.key);
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
      program: review.program
    };
    const postRef = this.db.database.ref('/reviews/' + review.id).set(updatedReview);
    const temp = {};
    updatedReview.id = review.id;
    temp[review.id] = new Review(updatedReview);
    this.cached = Object.assign(this.cached, temp);
    this.broadcast();
  }

  remove(review) {
    this.db.database.ref('/reviews/' + review.id).remove();
    delete this.cached[review.id];
    if (this.reviewIds.indexOf(review.id) !== -1) {
      this.reviewIds.splice(this.reviewIds.indexOf(review.id), 1);
    }
    this.courseService.removeReview(review.course, review.id);
    this.broadcast();
  }

  reviewList() {
    const reviews = Object.keys(this.cached).map(reviewId => {
      return new Review(this.cached[reviewId]);
    });
    return reviews;
  }

  getReviewsByCourse(courseId: string) {
    this.db.database.ref('/reviews').orderByChild('course').equalTo(courseId).once('value').then((snapshot) => {
      const reviewsObj = snapshot.val();
      const temp = {};
      temp[courseId] = {};

      const reviews = Object.keys(reviewsObj).map(reviewId => {
        const review: Review = new Review(reviewsObj[reviewId]);
        review.id = reviewId;
        temp[courseId][reviewId] = review;
        return review;
      });

      this.cached = Object.assign(this.cached, temp);
      if (this.cacheTime === null) {
        this.cacheTime = (new Date()).valueOf();
      }

      this.reviews$.next(reviews);

      return reviews;
    });
    return this.reviews$;
  }

  getReviewsByAuthor(authorId: string) {
    this.db.database.ref('/reviews').orderByChild('author').equalTo(authorId).once('value').then((snapshot) => {
      const reviewsObj = snapshot.val();
      const temp = {};
      temp[authorId] = {};

      const reviews = Object.keys(reviewsObj).map(reviewId => {
        const review: Review = new Review(reviewsObj[reviewId]);
        review.id = reviewId;
        temp[authorId][reviewId] = review;
        return review;
      });

      this.cached = Object.assign(this.cached, temp);
      if (this.cacheTime === null) {
        this.cacheTime = (new Date()).valueOf();
      }

      this.reviews$.next(reviews);

      return reviews;
    });
    return this.reviews$;
  }

  getRecentReviews() {
    if (this.recentSub === null) {
      this.recentSub = this.db.database.ref('/reviews').orderByChild('created').limitToFirst(10);
      this.recentSub.on('value', snapshot => {
        const reviewsObj = snapshot.val();
        const reviews = Object.keys(reviewsObj).map(reviewId => {
          const review: Review = new Review(reviewsObj[reviewId]);
          review.id = reviewId;
          return review;
        });

        this.recent$.next(reviews);

        return reviews;
      });
    }
    return this.recent$;
  }

  unsubRecent() {
    this.recentSub.off();
    this.recentSub = null;
  }

  getReviews(reviewIds: string[]) {
    this.reviewIds = reviewIds;
    this.reviews$.next(null);
    if (reviewIds.length === 0) {
      this.broadcast();
    } else {
      const reviews = [];
      reviewIds.forEach(reviewId => {
        reviews.push(this.getReview(reviewId));
      });
      forkJoin(reviews).subscribe((revs) => {
        this.broadcast();
      });
    }
    return this.reviews$;
  }

  broadcast() {
    this.localStorageService.setObject('reviews', this.cached);
    if (!this.reviews$) {
      this.reviews$ = new BehaviorSubject([]);
    }
    const reviews = this.reviewIds.map(reviewId => {
      if (this.cached[reviewId]) {
        return new Review(this.cached[reviewId]);
      } else {
        return null;
      }
    }).filter(rev => {
      return rev !== null;
    });
    this.reviews$.next(this.sortBySemester(reviews, false));
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

  getReview(reviewId) {
    if (Object.keys(this.cached).indexOf(reviewId) === -1 || this.cacheExpired()) {
      return this.downloadReview(reviewId);
    } else {
      return Observable.of(new Review(this.cached[reviewId]));
    }
  }

  private cacheExpired() {
    if (this.cacheTime === null) {
      return true;
    } else {
      if ((new Date()).valueOf() - this.cacheTime.valueOf() >= this.settingsService.cacheLength) {
        this.cacheTime = null;
        this.localStorageService.set('reviewsCacheTime', null);
        return true;
      } else {
        return false;
      }
    }
  }

}
