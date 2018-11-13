import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  ReviewsState,
  getFilteredReviews,
  getFilters,
} from '../../state/reviews/reducers';
import { Review, ReviewFilter } from '../../models/review';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  UpdateProgramFilter,
  UpdateDifficultyFilter,
  UpdateRatingFilter,
  UpdateSemesterFilter,
} from '../../state/reviews/actions/reviews';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'oms-course-reviews',
  templateUrl: './course-reviews.component.html',
  styleUrls: ['./course-reviews.component.scss'],
})
export class CourseReviewsComponent implements OnInit {
  @Input() courseId: string;
  reviews$: Observable<Review[]>;
  semesters = new FormControl();
  difficulties = new FormControl();
  ratings = new FormControl();
  programs = new FormControl();
  sortType = 'semester';
  sortDir = false;
  filters: ReviewFilter = {
    semesters: {},
    difficulties: {},
    ratings: {},
    programs: {},
  };
  fragment: string = null;

  constructor(
    private store: Store<ReviewsState>,
    private route: ActivatedRoute,
    private scroller: ViewportScroller
  ) {
    this.reviews$ = store.pipe(select(getFilteredReviews)) as Observable<
      Review[]
    >;
    (store.pipe(select(getFilters)) as Observable<ReviewFilter>).subscribe(
      filters => {
        this.filters = filters;
      }
    );
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      console.log(fragment);
    });
  }

  ngOnInit() {
    this.semesters.valueChanges.subscribe(sem => {
      this.store.dispatch(new UpdateSemesterFilter(sem));
    });

    this.difficulties.valueChanges.subscribe(dif => {
      this.store.dispatch(new UpdateDifficultyFilter(dif));
    });

    this.ratings.valueChanges.subscribe(rat => {
      this.store.dispatch(new UpdateRatingFilter(rat));
    });

    this.programs.valueChanges.subscribe(pro => {
      this.store.dispatch(new UpdateProgramFilter(pro));
    });
    this.reviews$.subscribe(reviews => {
      if (this.fragment && reviews) {
        if (reviews.findIndex(review => this.fragment === review.id) !== -1) {
          window.setTimeout(() => {
            this.scroller.scrollToAnchor(this.fragment);
          }, 1000);
        }
      }
    });
  }

  filterList(type) {
    return Object.keys(this.filters[type]).map(filt => {
      return this.filters[type][filt];
    });
  }

  sortByDate() {
    if (this.sortType === 'date') {
      this.sortDir = !this.sortDir;
    } else {
      this.sortType = 'date';
      this.sortDir = false;
    }
    // this.reviews = this.reviewService.sortByDate(this.reviews, this.sortDir);
  }

  sortBySemester() {
    if (this.sortType === 'semester') {
      this.sortDir = !this.sortDir;
    } else {
      this.sortType = 'semester';
      this.sortDir = false;
    }
    // this.reviews = this.reviewService.sortBySemester(
    //   this.reviews,
    //   this.sortDir
    // );
  }
}
