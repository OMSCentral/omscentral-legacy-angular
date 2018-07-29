import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState, getUserDetails } from '../state/auth/reducers';
import { UserDetails } from '../models/user';
import { Specialization } from '../models/specialization';
import { Review } from '../models/review';
import { LoadUserReviews } from '../state/reviews/actions/reviews';
import { getUserReviews } from '../state/reviews/reducers';
import { CourseService } from '../core/course.service';

@Component({
  selector: 'oms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<UserDetails>;
  reviews$: Observable<Review[]>;
  specializations: Specialization[];
  courses: any;
  basicCourses: any;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.user$ = this.store.select(getUserDetails);
    this.reviews$ = this.store.select(getUserReviews);
    this.user$.subscribe(user => {
      if (user && Object.keys(user).indexOf('reviews') !== -1) {
        this.store.dispatch(new LoadUserReviews({ reviews: user.reviews }));
      }
    });
    this.reviews$.subscribe(reviews => {
      if (reviews) {
        this.courses = reviews.map(review => {
          return review.course;
        });
      } else {
        this.courses = [];
      }
    });
    this.specializations = this.courseService.getSpecializations();
  }

  ngOnInit() {
    this.basicCourses = this.courseService.getBasicCourses();
  }
}
