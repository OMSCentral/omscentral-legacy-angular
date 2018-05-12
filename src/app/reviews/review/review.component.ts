import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../firebase/auth.service';
import { ReviewService } from '../review.service';
import { Review } from '../../models/review';
import { Semester } from '../../enums/semester.enum';
import { CourseService } from '../../courses/course.service';

@Component({
  selector: 'oms-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Input() review: Review;
  @Input() title ? = false;
  @Output() remove = new EventEmitter<Review>();

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
    private auth: AuthService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {
    auth.user.subscribe(user => {
      this.authId = user.uid;
    });
  }

  ngOnInit() {
    if (this.review && this.review.course) {
      // TODO
      // this.courseName = this.courseService.getCourseName(this.review.course);
    }
  }

  edit() {
    this.router.navigate(['/reviews', this.review.id]);
  }

  delete() {
    this.remove.emit(this.review);
  }
}
