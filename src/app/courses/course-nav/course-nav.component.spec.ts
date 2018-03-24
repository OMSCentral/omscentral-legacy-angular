import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNavComponent } from './course-nav.component';

describe('CourseNavComponent', () => {
  let component: CourseNavComponent;
  let fixture: ComponentFixture<CourseNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseNavComponent ]
    })
    .compileComponents();
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
