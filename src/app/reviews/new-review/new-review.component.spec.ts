import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Review } from '../../models/review';

import { PipeModule } from '../../pipes/pipe.module';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../../firebase/auth.service';
class MockAuth {
  user = new BehaviorSubject({});
}

import { CourseService } from '../../courses/course.service';
class MockCourse {
  getCourse() {
    return new BehaviorSubject({});
  }
  getCourses() {
    return new BehaviorSubject([]);
  }
}

import { ReviewService } from '../review.service';
class MockReview {
  getReview() {
    return new BehaviorSubject(new Review({}));
  }
}

import { ClarityModule } from 'clarity-angular';

import { NewReviewComponent } from './new-review.component';

describe('NewReviewComponent', () => {
  let component: NewReviewComponent;
  let fixture: ComponentFixture<NewReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PipeModule, RouterTestingModule, ClarityModule, FormsModule, ReactiveFormsModule],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: CourseService, useClass: MockCourse },
        { provide: ReviewService, useClass: MockReview },
        { provide: AuthService, useClass: MockAuth }
      ],
      declarations: [ NewReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
