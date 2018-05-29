import { Component, OnInit } from '@angular/core';
import { AuthService } from '../firebase/auth.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../core/user.service';
import { Observable } from 'rxjs';
import { ReviewService } from '../reviews/review.service';
import { LocalStorageService } from '../core/local-storage.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState, getUserDetails } from '../state/auth/reducers';
import { UserDetails } from '../models/user';
import { Review } from '../models/review';
import { LoadUserReviews } from '../state/reviews/actions/reviews';
import { getUserReviews } from '../state/reviews/reducers';

@Component({
  selector: 'oms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<UserDetails>;
  reviews$: Observable<Review[]>;
  profileForm: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private reviewService: ReviewService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.user$ = this.store.select(getUserDetails);
    this.reviews$ = this.store.select(getUserReviews);
    this.user$.subscribe(user => {
      if (user && Object.keys(user).indexOf('reviews') !== -1) {
        this.store.dispatch(new LoadUserReviews({reviews: user.reviews}));
      }
    });
  }

  ngOnInit() {

  }
}
