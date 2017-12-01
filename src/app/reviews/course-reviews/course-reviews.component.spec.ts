import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CourseReviewsComponent } from './course-reviews.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../../firebase/auth.service';
class MockAuth {
  user = new BehaviorSubject({});
}

import { CourseService } from '../../core/course.service';
class MockCourse {
  getCourse() {
    return new BehaviorSubject({});
  }
}

import { ReviewService } from '../review.service';
class MockReview {

}

import { ClarityModule } from 'clarity-angular';

describe('CourseReviewsComponent', () => {
  let component: CourseReviewsComponent;
  let fixture: ComponentFixture<CourseReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ClarityModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: CourseService, useClass: MockCourse },
        { provide: ReviewService, useClass: MockReview },
        { provide: AuthService, useClass: MockAuth }
      ],
      declarations: [CourseReviewsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
