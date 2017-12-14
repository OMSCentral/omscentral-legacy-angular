import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Review } from '../models/review';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../firebase/auth.service';
import { CourseService } from '../core/course.service';
import { LocalStorageService } from '../core/local-storage.service';

// temporary
// import * as jsonData from '../../../merged-dev.json';

@Injectable()
export class ReviewService {
  cached = {};
  cacheTime: Date = null;
  reviews$: BehaviorSubject<any> = new BehaviorSubject([]);
  reviewIds: string[];

  constructor(private db: AngularFireDatabase, private auth: AuthService,
    private courseService: CourseService, private localStorageService: LocalStorageService) {
    this.cached = localStorageService.getObject('reviews') || {};
    this.cacheTime = new Date(localStorageService.get('reviewsCacheTime'));
  }

  downloadReview(reviewId) {
    return this.db.database.ref('/reviews/' + reviewId).once('value').then((snapshot) => {
      const review: Review = new Review(snapshot.val());
      review.id = reviewId;
      const temp = {};
      temp[reviewId] = review;
      this.cached = Object.assign(this.cached, temp);
      if (this.cacheTime === null) {
        this.cacheTime = new Date();
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
      rating: review.rating
    };
    const postRef: any = this.db.database.ref('/reviews/').push(newReview).then((res) => {
      return res;
    }, (err) => {
      console.log(err);
    });
    this.reviewIds.push(postRef.key);
    const temp = {};
    newReview['id'] = postRef.key;
    temp[postRef.key] = new Review(newReview);
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
      rating: review.rating
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
      return rev !== null && rev.semester;
    }).sort((a, b) => {
      if (a.author === this.auth.authState.uid) {
        return -1;
      } else {
        if (b.author === this.auth.authState.uid) {
          return 1;
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
    this.reviews$.next(reviews);
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
      if ((new Date()).valueOf() - this.cacheTime.valueOf() >= 24 * 60 * 60 * 1000) {
        this.cacheTime = null;
        this.localStorageService.set('reviewsCacheTime', null);
        return true;
      } else {
        return false;
      }
    }
  }

}
