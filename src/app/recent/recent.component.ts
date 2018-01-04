import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../reviews/review.service';

@Component({
  selector: 'oms-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {

  constructor(private reviewService: ReviewService) {

  }

  ngOnInit() {
  }

}
