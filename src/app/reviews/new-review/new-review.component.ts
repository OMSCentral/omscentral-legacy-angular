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
import { ReviewsState, getFilteredStats } from '../../state/reviews/reducers';
import { Course } from '../../models/course';

@Component({
  selector: 'oms-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss'],
})
export class NewReviewComponent implements OnInit {
  review: Review;
  review$: BehaviorSubject<any>;
  courses$: Observable<any> | Promise<Observable<any>>;
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
    this.courses$ = this.courseStore.pipe(select(getAllCourses)) as Observable<Course[]>;
    this.createForm();
  }

  ngOnInit() {
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
    this.reviewService.remove(this.review);
    this.router.navigate(['/courses', courseId]);
  }

  save() {
    if (this.review.isNew) {
      this.review.save(this.reviewForm.value);
      this.reviewService.push(this.review);
    } else {
      this.review.save(this.reviewForm.value);
      this.reviewService.update(this.review);
    }
    this.router.navigate(['/courses', this.review.course]);
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
