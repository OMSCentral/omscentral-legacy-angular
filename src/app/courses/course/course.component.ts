import { debounceTime, switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../../courses/course.service';
import { AuthService } from '../../firebase/auth.service';
import { ReviewService } from '../../reviews/review.service';
import { GradeService } from '../../grades/grade.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CoursesState } from '../../state/courses/reducers';
import { SelectCourse, LoadCourse } from '../../state/courses/actions/courses';


import { Review } from '../../models/review';

@Component({
  selector: 'oms-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  authId: string = null;
  courseId: string;

  constructor(
    private store: Store<CoursesState>,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private reviewService: ReviewService,
    private auth: AuthService,
    private gradeService: GradeService
  ) {

  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.store.dispatch(new SelectCourse(this.courseId));
  }

  ngOnDestroy() {

  }
}
