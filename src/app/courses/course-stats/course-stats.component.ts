import { Component, OnInit, Input } from '@angular/core';
import { Course, CourseStats } from '../../models/course';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CoursesState, getSelectedCourse } from '../../state/courses/reducers';
import { GradeService } from '../../grades/grade.service';
import { ReviewsState, getFilteredStats } from '../../state/reviews/reducers';

@Component({
  selector: 'oms-course-stats',
  templateUrl: './course-stats.component.html',
  styleUrls: ['./course-stats.component.scss'],
})
export class CourseStatsComponent implements OnInit {
  @Input() courseId: string;
  course$: Observable<Course>;
  stats$: Observable<CourseStats>;
  grades: any;

  displayedColumns = ['semester', 'total', 'a', 'b', 'c', 'd', 'f', 'w'];

  constructor(
    private courseStore: Store<CoursesState>,
    private reviewStore: Store<ReviewsState>,
    private gradeService: GradeService
  ) {
    this.course$ = courseStore.pipe(select(getSelectedCourse)) as Observable<
      Course
    >;
    this.stats$ = reviewStore.pipe(select(getFilteredStats)) as Observable<CourseStats>;
  }

  ngOnInit() {
    this.grades = this.gradeService.getCourseGrades(this.courseId);
  }
}
