import { Component, OnInit } from '@angular/core';
import { AuthService } from '../firebase/auth.service';
import { UserService } from '../core/user.service';
import { Observable } from 'rxjs/Observable';
import { ReviewService } from '../reviews/review.service';

@Component({
  selector: 'oms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  auth: any = {};
  user$: Observable<any>;
  reviews$: Observable<any[]>;

  constructor(private authService: AuthService, private userService: UserService, private reviewService: ReviewService) {}

  ngOnInit() {
    this.user$ = this.userService.getUser();
    this.user$.subscribe(user => {
      if (user.reviews) {
        console.log(user.reviews);
        const reviewIds = Object.keys(user.reviews).filter(revId => {
          return user.reviews[revId];
        });
        this.reviews$ = this.reviewService.getReviews(reviewIds);
      }
    });
  }

}
