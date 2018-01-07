import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../../courses/course.service';
import { AuthService } from '../../firebase/auth.service';
import { ReviewService } from '../review.service';
import { GradeService } from '../../grades/grade.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
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
  grades: any;
  newReview = false;
  courseSub: any;
  reviewSub: any;
  loading = true;
  sortType = 'semester';
  sortDir = false;
  percent = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private courseService: CourseService, private reviewService: ReviewService,
    private auth: AuthService, private gradeService: GradeService) {
    auth.user.subscribe(user => {
      this.authId = user.uid;
    });
  }

  ngOnInit() {
    this.course$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.courseService.getCourse(params.get('courseId')));

    this.courseSub = this.course$.debounceTime(1000).subscribe(course => {
      if (course === null) {
        this.course = null;
      }
      if (this.course.id !== course.id) {
        this.reviews$ = this.reviewService.getReviewsByCourse(course.id);
        this.grades = this.gradeService.getCourseGrades(course.id);
        this.reviewSub = this.reviews$.debounceTime(1000).subscribe(reviews => {
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
    this.review = new Review({ course: this.course.courseId });
    this.newReview = false;
  }

  remove(evt) {
    this.reviewService.remove(evt);
  }

  update(evt) {
    this.reviewService.update(evt);
  }

  sortByDate() {
    if (this.sortType === 'date') {
      this.sortDir = !this.sortDir;
    } else {
      this.sortType = 'date';
      this.sortDir = false;
    }
    this.reviews = this.reviewService.sortByDate(this.reviews, this.sortDir);
  }

  sortBySemester() {
    if (this.sortType === 'semester') {
      this.sortDir = !this.sortDir;
    } else {
      this.sortType = 'semester';
      this.sortDir = false;
    }
    this.reviews = this.reviewService.sortBySemester(this.reviews, this.sortDir);
  }

}
