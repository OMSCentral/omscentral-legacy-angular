import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Review } from '../models/review';

// temporary
import * as jsonData from '../../../merged-dev.json';

@Injectable()
export class ReviewService {
  cached = {};
  cacheTime: Date = null;

  constructor() {}

  downloadReviews() {
    const reviews = (<any>jsonData).reviews;
    Object.keys(reviews).forEach(reviewId => {
      reviews[reviewId].id = reviewId;
    });
    this.cached = Object.assign(this.cached, reviews);
    if (this.cacheTime === null) {
      this.cacheTime = new Date();
    }
    return this.reviewList();
  }

  downloadReview(reviewId) {
    const review = (<any>jsonData).reviews[reviewId];
    review.id = reviewId;
    const temp = {};
    temp[reviewId] = review;
    this.cached = Object.assign(this.cached, temp);
    if (this.cacheTime === null) {
      this.cacheTime = new Date();
    }
    return new Review(review);
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
    return Observable.of(reviews);
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
      }  else {
        return false;
      }
    }
  }

}
