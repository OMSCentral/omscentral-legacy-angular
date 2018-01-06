import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../../models/review';

@Component({
  selector: 'oms-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  @Input() reviews: any[];
  @Input() modify?= false;
  @Output() update = new EventEmitter<Review>();
  @Output() remove = new EventEmitter<Review>();

  expanded = false;
  constructor() { }

  ngOnInit() {

  }

  toggleExpand() {
    this.expanded = !this.expanded;
    this.reviews = this.reviews.map(rev => {
      rev.expanded = this.expanded;
      return rev;
    });
  }

}
