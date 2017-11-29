import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from '../../firebase/auth.service';
import { ReviewService } from '../review.service';
import { Review } from '../../models/review';
import { Semester } from '../../enums/semester.enum';
import { Difficulty } from '../../enums/difficulty.enum';
import { Rating } from '../../enums/rating.enum';

@Component({
  selector: 'oms-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() review: Review;
  @Output() cancelNew = new EventEmitter<boolean>();
  reviewForm: FormGroup;
  authId: string;
  semesters = Object.keys(Semester).filter(sem => {
    return sem !== '0000-0';
  });
  difficulties = Array.from(new Array(5), (x,i) => i+1);
  ratings = Array.from(new Array(5), (x,i) => i+1);

  constructor(private auth: AuthService, private reviewService: ReviewService, private fb: FormBuilder) {
    auth.user.subscribe(user => {
      this.authId = user.uid;
    });
    this.createForm();
  }

  createForm() {
    this.reviewForm = this.fb.group({
      text: ['', Validators.required],
      rating: '',
      workload: '',
      difficulty: '',
      semester: ''
    });
    this.reviewForm.valueChanges.subscribe(changes => {
      this.review.update(changes);
    });
  }

  edit() {
    this.reviewForm.setValue(this.review.edit());
  }

  save() {
    this.review.save(this.reviewForm.value);
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
