import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipeModule } from '../../pipes/pipe.module';

import { BehaviorSubject } from 'rxjs';
import { CourseService } from '../../courses/course.service';
class MockCourse {
  getCourses() {
    return new BehaviorSubject(null);
  }
  getCourse() {
    return new BehaviorSubject({});
  }
}

import { GradeService } from '../../grades/grade.service';
class MockGrade {
  getCourses() {}
  getGrades() {}
}

import { ReviewService } from '../../reviews/review.service';
class MockReview {}

import { AuthService } from '../../firebase/auth.service';
class MockAuth {
  user = new BehaviorSubject({});
}
import { CourseNavComponent } from './course-nav.component';

describe('CourseNavComponent', () => {
  let component: CourseNavComponent;
  let fixture: ComponentFixture<CourseNavComponent>;

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
        { provide: GradeService, useClass: MockGrade },
        { provide: AuthService, useClass: MockAuth },
        { provide: ReviewService, useClass: MockReview },
      ],
      declarations: [CourseNavComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
