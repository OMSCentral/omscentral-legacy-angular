import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../firebase/auth.service';
import { ReviewService } from '../review.service';
import { Review } from '../../models/review';
import { Semester } from '../../enums/semester.enum';
import { CourseService } from '../../courses/course.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CoursesState, getSelectedCourse, getAllCourses } from '../../state/courses/reducers';
import { ReviewsState, getFilteredStats, getSelectedReview } from '../../state/reviews/reducers';
import { Course } from '../../models/course';
import { NewReview, EditReview, SelectReview, RemoveReview } from '../../state/reviews/actions/reviews';

@Component({
  selector: 'oms-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss'],
})
export class NewReviewComponent implements OnInit {
  review: Review;
  review$: Observable<Review>;
  courses: Course[];
  reviewForm: FormGroup;
  courseName: string;
  authId: string;
  semesters = Object.keys(Semester).filter(sem => {
    return sem !== '0000-0';
  });
  difficulties = Array.from(new Array(5), (x, i) => i + 1);
  programs = Array.from(new Array(2), (x, i) => i + 1);
  ratings = Array.from(new Array(5), (x, i) => i + 1);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseStore: Store<CoursesState>,
    private reviewStore: Store<ReviewsState>,
    private auth: AuthService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private courseService: CourseService
  ) {
    auth.user.subscribe(user => {
      this.authId = user.uid;
    });
    // this.courses$ = this.courseStore.pipe(select(getAllCourses)) as Observable<Course[]>;
    const basicCourses = this.courseService.getBasicCourses();
    this.courses = Object.keys(basicCourses).map(courseId => {
      const basicCourse = basicCourses[courseId];
      basicCourse.id = courseId;
      basicCourse.combined = courseId + ': ' + basicCourse.name;
      return basicCourses[courseId];
    });
    this.createForm();
  }

  ngOnInit() {
    let reviewId = this.route.snapshot.paramMap.get('reviewId');
    let courseId = this.route.snapshot.queryParamMap.get('courseId');
    if (reviewId) {
      // get review
      this.reviewStore.dispatch(new SelectReview(reviewId));
      this.review$ = this.reviewStore.pipe(select(getSelectedReview)) as Observable<Review>;
      this.review$.subscribe(review => {
        this.review = new Review(review);
        this.edit();
      });
    } else {
      this.review = new Review({
        course: courseId
      });
      this.edit();
    }

    // this.route.paramMap.subscribe(param => {
    //   console.log((<any>param).params);
    // });
    // this.route.queryParamMap.subscribe(param => {
    //   console.log((<any>param).params);
    // });

    // this.review$ = this.reviewService.getReview(
    //   this.route.snapshot.paramMap.get('reviewId')
    // );
    // this.review$ = this.route.paramMap
    //   .switchMap((params: ParamMap) =>
    //     this.reviewService.getReview(params.get('reviewId')));

    // this.course$ = this.route.paramMap
    //     .switchMap((params: ParamMap) =>
    //       this.courseService.getCourse(params.get('courseId')));

    // this.review$.subscribe(review => {
    //   this.review = review;
    //   if (this.route.snapshot.queryParamMap.get('courseId')) {
    //     this.review.course = this.route.snapshot.queryParamMap.get('courseId');
    //   }
    //   this.edit();
    // });

    // if (this.review && this.review.course) {
    //   this.courseName = this.courseService.getCourseName(this.review.course);
    // }
  }

  createForm() {
    this.reviewForm = this.fb.group({
      course: ['', Validators.required],
      text: ['', Validators.required],
      rating: ['', Validators.required],
      workload: ['', [Validators.required, Validators.max(84)]],
      difficulty: ['', Validators.required],
      program: ['', Validators.required],
      semester: ['', Validators.required],
      proctorTrack: '',
      firstCourse: '',
      previousClasses: '',
      projects: '',
      groupProjects: '',
      tests: '',
      extraCredit: '',
      moneySpent: '',
      frontLoad: '',
    });
    this.reviewForm.valueChanges.subscribe(changes => {
      this.review.update(changes);
    });
  }

  edit() {
    const editReview = this.review.edit();
    this.reviewForm.setValue(editReview);
  }

  delete() {
    // this.remove.emit(this.review);
    const courseId = this.review.course;
    this.reviewStore.dispatch(new RemoveReview(this.review));
  }

  save() {
    if (this.review.isNew) {
      this.review.save(this.reviewForm.value);
      this.reviewStore.dispatch(new NewReview(this.review));
    } else {
      this.review.save(this.reviewForm.value);
      this.reviewStore.dispatch(new EditReview(this.review));
    }
  }

  cancel() {
    if (this.review.isNew) {
      // state go back?
    }
    if (this.review.isEdit) {
      this.review.cancel();
    }
  }
}
