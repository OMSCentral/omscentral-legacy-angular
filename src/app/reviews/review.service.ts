import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Review } from '../models/review';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../firebase/auth.service';

// temporary
// import * as jsonData from '../../../merged-dev.json';

@Injectable()
export class ReviewService {
  cached = {};
  cacheTime: Date = null;
  reviewIds: string[] = [];

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

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
      author: this.auth.authState.uid,
      course: review.course,
      difficulty: review.difficulty,
      semester: review.semester,
      text: review.text,
      workload: review.workload,
      rating: review.rating
    };
    const postRef = this.db.database.ref('/reviews/').push(newReview);
    this.reviewIds.push(postRef.key);
    const temp = {};
    temp[postRef.key] = review;
    Object.assign(this.cached, temp);

    // Add review to course cache
  }

  update(review: Review) {
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
      author: this.auth.authState.uid,
      course: review.course,
      difficulty: review.difficulty,
      semester: review.semester,
      text: review.text,
      workload: review.workload,
      rating: review.rating
    };
    const postRef = this.db.database.ref('/reviews/' + review.id).set(newReview);
    const temp = {};
    temp[review.id] = review;
    Object.assign(this.cached, temp);
  }

  remove(reviewId) {
    this.db.database.ref('/reviews/' + reviewId).remove();
    delete this.cached[reviewId];
  }

  reviewList() {
    const reviews = Object.keys(this.cached).map(reviewId => {
      return new Review(this.cached[reviewId]);
    });
    return reviews;
  }

  getReviews(reviewIds: string[]) {
    const reviews = [];
    reviewIds.forEach(reviewId => {
      reviews.push(this.getReview(reviewId));
    });
    return forkJoin(reviews);
  }

  getReview(reviewId) {
    if (Object.keys(this.cached).indexOf(reviewId) === -1 || this.cacheExpired()) {
      return this.downloadReview(reviewId);
    } else {
      return new Review(this.cached[reviewId]);
    }
  }

  private cacheExpired() {
    if (this.cacheTime === null) {
      return true;
    } else {
      if ((new Date()).valueOf() - this.cacheTime.valueOf() >= 24 * 60 * 60 * 1000) {
        this.cacheTime = null;
        return true;
      } else {
        return false;
      }
    }
  }

}
