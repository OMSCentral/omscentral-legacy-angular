import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecentComponent } from './recent.component';

import { PipeModule } from '../pipes/pipe.module';

import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../firebase/auth.service';
class MockAuth {
  user = new BehaviorSubject({});
}

import { CourseService } from '../courses/course.service';
class MockCourse {
  getCourses() {
    return new BehaviorSubject(null);
  }
}

import { ReviewService } from '../reviews/review.service';
class MockReview {
  getRecentReviews() {}
  unsubRecent() {}
}

describe('RecentComponent', () => {
  let component: RecentComponent;
  let fixture: ComponentFixture<RecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PipeModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: CourseService, useClass: MockCourse },
        { provide: ReviewService, useClass: MockReview },
        { provide: AuthService, useClass: MockAuth },
      ],
      declarations: [RecentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
