import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../models/review';
import { Semester } from '../../enums/semester.enum';
import { CourseService } from '../../core/course.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  CoursesState,
  getSelectedCourse,
  getAllCourses,
} from '../../state/courses/reducers';
import { ReviewsState, getSelectedReview } from '../../state/reviews/reducers';
import { Course } from '../../models/course';
import { NewReview, EditReview, RemoveReview } from '../authed-review.actions';
import { SelectReview } from '../../state/reviews/actions/reviews';
import { User } from '../../models/user';
import { getUser } from '../../state/auth/reducers';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'oms-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss'],
})
export class NewReviewComponent implements OnInit {
  review: Review;
  review$: Observable<Review>;
  courses: Course[];
  filteredCourses: Observable<Course[]>;
  reviewForm: FormGroup;
  courseName: string;
  authId: string;
  semesters = Object.keys(Semester)
    .filter(sem => {
      return sem !== '0000-0';
    })
    .reverse();
  difficulties = Array.from(new Array(5), (x, i) => i + 1);
  programs = Array.from(new Array(2), (x, i) => i + 1);
  ratings = Array.from(new Array(5), (x, i) => i + 1);

  constructor(
    private route: ActivatedRoute,
    private reviewStore: Store<ReviewsState>,
    private fb: FormBuilder,
    private courseService: CourseService,
    private store: Store<User>
  ) {
    this.store.select(getUser).subscribe(user => {
      if (user) {
        this.authId = user.uid;
      }
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
      this.review$ = this.reviewStore.pipe(
        select(getSelectedReview)
      ) as Observable<Review>;
      this.review$.subscribe(review => {
        this.review = new Review(review);
        this.edit();
      });
    } else {
      this.review = new Review({
        course: courseId,
      });
      this.edit();
    }
  }

  createForm() {
    this.reviewForm = this.fb.group({
      course: ['', [Validators.required, this.courseValidator()]],
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

    this.filteredCourses = this.reviewForm
      .get('course')
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filterCourses(value))
      );
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

  private _filterCourses(value: string): Course[] {
    const filterValue = value.toLowerCase();

    return this.courses.filter(
      option => option.combined.toLowerCase().indexOf(filterValue) !== -1
    );
  }

  private courseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden =
        this.courses.findIndex(course => control.value === course.id) === -1;
      return forbidden ? { noCourse: { value: control.value } } : null;
    };
  }
}
