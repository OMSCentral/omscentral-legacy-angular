import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../firebase/auth.service';
import { ReviewService } from '../review.service';
import { Review } from '../../models/review';
import { Semester } from '../../enums/semester.enum';
import { CourseService } from '../../courses/course.service';

@Component({
  selector: 'oms-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() review: Review;
  @Input() title?= false;
  @Input() modify?= true;
  @Output() cancelNew = new EventEmitter<boolean>();
  @Output() saveNew = new EventEmitter<Review>();
  @Output() update = new EventEmitter<Review>();
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

  constructor(private auth: AuthService, private reviewService: ReviewService,
    private fb: FormBuilder, private courseService: CourseService) {
    auth.user.subscribe(user => {
      this.authId = user.uid;
    });
    this.createForm();
  }

  ngOnInit() {
    if (this.review && this.review.course) {
      this.courseName = this.courseService.getCourseName(this.review.course);
    }
  }

  createForm() {
    this.reviewForm = this.fb.group({
      text: ['', Validators.required],
      rating: ['', Validators.required],
      workload: ['', Validators.required],
      difficulty: ['', Validators.required],
      program: ['', Validators.required],
      semester: ['', Validators.required]
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
    this.remove.emit(this.review);
  }

  save() {

    if (this.review.isNew) {
      this.review.save(this.reviewForm.value);
      this.saveNew.emit(this.review);
    } else {
      this.review.save(this.reviewForm.value);
      this.update.emit(this.review);
    }
  }

  cancel() {
    if (this.review.isNew) {
      this.cancelNew.emit(true);
    }
    if (this.review.isEdit) {
      this.review.cancel();
    }
  }

}
