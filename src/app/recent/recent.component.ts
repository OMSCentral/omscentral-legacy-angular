import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../models/review';
import { Observable } from 'rxjs';

@Component({
  selector: 'oms-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss'],
})
export class RecentComponent implements OnInit, OnDestroy {
  reviews$: Observable<Review[]>;

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviews$ = this.reviewService.getRecentReviews();
  }

  ngOnDestroy() {
    this.reviewService.unsubRecent();
  }
}
