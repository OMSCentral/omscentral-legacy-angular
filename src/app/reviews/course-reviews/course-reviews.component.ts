import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../../core/course.service';
import { AuthService } from '../../firebase/auth.service';
import { ReviewService } from '../review.service';
import { Observable } from 'rxjs/Observable';
import { Review } from '../../models/review';

@Component({
  selector: 'oms-course-reviews',
  templateUrl: './course-reviews.component.html',
  styleUrls: ['./course-reviews.component.scss']
})
export class CourseReviewsComponent implements OnInit {
  authId: string = null;
  course$: Observable<any>;
  reviews$: Observable<any>;
  review: Review = null;
  newReview: boolean = false;
  

  constructor(private route: ActivatedRoute, private router: Router,
    private courseService: CourseService, private reviewService: ReviewService,
    private auth: AuthService) {
        auth.user.subscribe(user => {
          this.authId = user.uid;
          this.review = new Review({author: user.uid});
        });
    }

  ngOnInit() {
    this.course$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.courseService.getCourse(params.get('courseId')));

    this.course$.subscribe(course => {
      this.reviews$ = this.reviewService.getReviews(Object.keys(course.reviews));
    });
  }

  cancelNew(evt) {
    console.log(evt);
    this.newReview = false;
  }

}
