import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../../core/course.service';
import { AuthService } from '../../firebase/auth.service';
import { ReviewService } from '../review.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import { Review } from '../../models/review';

@Component({
  selector: 'oms-course-reviews',
  templateUrl: './course-reviews.component.html',
  styleUrls: ['./course-reviews.component.scss']
})
export class CourseReviewsComponent implements OnInit, OnDestroy {
  authId: string = null;
  course$: Observable<any>;
  course: any = {};
  reviews$: Observable<any>;
  reviews: any;
  review: Review = null;
  newReview = false;
  courseSub: any;
  reviewSub: any;
  loading = true;

  constructor(private route: ActivatedRoute, private router: Router,
    private courseService: CourseService, private reviewService: ReviewService,
    private auth: AuthService) {
    auth.user.subscribe(user => {
      this.authId = user.uid;
    });
  }

  ngOnInit() {
    this.course$ = this.route.paramMap.throttleTime(1000)
      .switchMap((params: ParamMap) =>
        this.courseService.getCourse(params.get('courseId')));

    this.courseSub = this.course$.throttleTime(1000).subscribe(course => {
      if (course === null) {
        this.course = null;
      }
      if (this.course.id !== course.id) {
        const revIds = Object.keys(course.reviews || {}).filter(revId => {
          return course.reviews[revId];
        });
        this.reviews$ = this.reviewService.getReviews(revIds);
        this.reviewSub = this.reviews$.throttleTime(1000).subscribe(reviews => {
          if (reviews !== null) {
            const courseReviews = reviews.filter(rev => {
              return rev.course === course.id;
            });
            this.reviews = courseReviews;
            this.course = this.courseService.updateCounts(course.id, courseReviews);
            this.loading = false;
          }
        });
        this.review = new Review({ course: course.courseId });
      }
    });
  }

  ngOnDestroy() {
    if (this.courseSub) {
      this.courseSub.unsubscribe();
    }
    if (this.reviewSub) {
      this.reviewSub.unsubscribe();
    }
    this.reviews$ = null;
    this.review = null;
    this.course$ = null;
    this.course = {};
  }

  saveNew(evt) {
    evt.course = this.course.id;
    evt.author = this.authId;
    this.reviewService.push(evt);
    this.newReview = false;
    this.review = new Review({ course: this.course.id });
  }

  cancelNew(evt) {
    this.newReview = false;
  }

  remove(evt) {
    this.reviewService.remove(evt);
  }

  update(evt) {
    this.reviewService.update(evt);
  }

}
