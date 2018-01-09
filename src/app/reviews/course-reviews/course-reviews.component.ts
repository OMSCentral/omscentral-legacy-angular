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
  filters = {
    semesters: {},
    difficulties: {},
    ratings: {}
  };
  filtered: Review[] = [];
  stats = {};

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
          const sems = {};
          const diff = {};
          const rats = {};
          reviews.forEach(rev => {
            if (rev.semester && rev.semester !== '0000-0') {
              this.filters.semesters[rev.semester] = {
                id: rev.semester,
                selected: false,
                disabled: false
              };
            }
            if (rev.difficulty) {
              this.filters.difficulties[rev.difficulty] = {
                id: rev.difficulty,
                selected: false,
                disabled: false
              };
            }
            if (rev.rating) {
              this.filters.ratings[rev.rating] = {
                id: rev.rating,
                selected: false,
                disabled: false
              };
            }
          });

          if (reviews !== null) {
            const courseReviews = reviews.filter(rev => {
              return rev.course === course.id;
            });
            this.reviews = courseReviews;
            this.filtered = courseReviews;
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

  semesterFilter(review, filters) {
    const semesters = Object.keys(filters.semesters).filter(sem => {
      return filters.semesters[sem].selected;
    });
    if (semesters.length === 0) {
      return true;
    } else {
      return semesters.indexOf(review.semester) !== -1;
    }
  }

  difficultyFilter(review, filters) {
    const difficulties = Object.keys(filters.difficulties).filter(sem => {
      return filters.difficulties[sem].selected;
    });
    if (difficulties.length === 0) {
      return true;
    } else {
      return difficulties.indexOf(String(review.difficulty)) !== -1;
    }
  }

  ratingFilter(review, filters) {
    const ratings = Object.keys(filters.ratings).filter(sem => {
      return filters.ratings[sem].selected;
    });
    if (ratings.length === 0) {
      return true;
    } else {
      return ratings.indexOf(String(review.rating)) !== -1;
    }
  }

  filterList(type) {
    return Object.keys(this.filters[type]).map(filt => {
      return this.filters[type][filt];
    });
  }

  selected(type, value) {
    return this.filters[type][value].selected;
  }

  change(type, value) {
    this.filters[type][value].selected = !this.filters[type][value].selected;
    const filtered = this.reviews.filter(review => {
      return this.semesterFilter(review, this.filters)
        && this.difficultyFilter(review, this.filters)
        && this.ratingFilter(review, this.filters);
    });
    if (filtered.length === this.reviews.length) {
      this.stats = {};
      if (this.sortType === 'date') {
        this.filtered = this.reviewService.sortByDate(this.reviews, this.sortDir);
      } else {
        this.filtered = this.reviewService.sortBySemester(this.reviews, this.sortDir);
      }
    } else {
      let workload = 0;
      let worNum = 0;
      let rating = 0;
      let ratNum = 0;
      let difficulty = 0;
      let difNum = 0;
      filtered.forEach(rev => {
        if (rev.workload) {
          workload += rev.workload;
          worNum++;
        }
        if (rev.rating) {
          rating += rev.rating;
          ratNum++;
        }
        if (rev.difficulty) {
          difficulty += rev.difficulty;
          difNum++;
        }
      });

      this.stats = {
        num: filtered.length,
        workload: workload / worNum,
        rating: rating / ratNum,
        difficulty: difficulty / difNum
      };

      if (this.sortType === 'date') {
        this.filtered = this.reviewService.sortByDate(filtered, this.sortDir);
      } else {
        this.filtered = this.reviewService.sortBySemester(filtered, this.sortDir);
      }
    }
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
