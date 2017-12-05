import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from 'clarity-angular';
import { RouterTestingModule } from '@angular/router/testing';

import { GradesComponent } from './grades.component';
import { PipeModule } from '../pipes/pipe.module';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CourseService } from '../core/course.service';
class MockCourse {
  getCourses() {
    return new BehaviorSubject(null);
  }
}

import { GradeService } from './grade.service';
class MockGrade {
  getGrades() {

  }
}

describe('GradesComponent', () => {
  let component: GradesComponent;
  let fixture: ComponentFixture<GradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PipeModule, ClarityModule, RouterTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [{ provide: CourseService, useClass: MockCourse }, { provide: GradeService, useClass: MockGrade }],
      declarations: [GradesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
