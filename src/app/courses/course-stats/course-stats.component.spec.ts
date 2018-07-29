import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStatsComponent } from './course-stats.component';

describe('CourseStatsComponent', () => {
  let component: CourseStatsComponent;
  let fixture: ComponentFixture<CourseStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseStatsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
