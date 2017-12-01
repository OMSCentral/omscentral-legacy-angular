import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipeModule } from '../../pipes/pipe.module';

import { ReviewComponent } from './review.component';
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

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PipeModule, RouterTestingModule, ClarityModule, FormsModule, ReactiveFormsModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: CourseService, useClass: MockCourse },
        { provide: ReviewService, useClass: MockReview },
        { provide: AuthService, useClass: MockAuth }
      ],
      declarations: [ReviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
