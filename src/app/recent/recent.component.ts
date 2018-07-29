import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReviewService } from '../core/review.service';
import { Review } from '../models/review';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ReviewsState, getRecentReviews } from '../state/reviews/reducers';
import { LoadRecentReviews } from '../state/reviews/actions/reviews';

@Component({
  selector: 'oms-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss'],
})
export class RecentComponent implements OnInit, OnDestroy {
  reviews$: Observable<Review[]>;

  constructor(private store: Store<ReviewsState>) {}

  ngOnInit() {
    this.reviews$ = this.store.select(getRecentReviews);
    this.store.dispatch(new LoadRecentReviews());
  }

  ngOnDestroy() {
    // this.reviewService.unsubRecent();
  }
}
