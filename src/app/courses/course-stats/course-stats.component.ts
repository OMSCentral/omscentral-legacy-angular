import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../models/course';
import {Observable} from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CoursesState, getSelectedCourse } from '../../state/courses/reducers';
import { GradeService } from '../../grades/grade.service';

@Component({
  selector: 'oms-course-stats',
  templateUrl: './course-stats.component.html',
  styleUrls: ['./course-stats.component.scss']
})
export class CourseStatsComponent implements OnInit {
  @Input() courseId: string;
  course$: Observable<Course>;
  grades: any;
  stats = {
    num: null,
    workload: null,
    difficulty: null,
    rating: null,
  };

  displayedColumns = ['semester', 'total', 'a', 'b', 'c', 'd', 'f', 'w'];

  constructor(private store: Store<CoursesState>, private gradeService: GradeService) {
    this.course$ = store.pipe(select(getSelectedCourse)) as Observable<Course>;
  }

  ngOnInit() {
    this.grades = this.gradeService.getCourseGrades(this.courseId);
  }
}