import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GradeService } from '../../grades/grade.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Course } from '../../models/course';

import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import {
  CoursesState,
  getSpecializationCourses,
} from '../../state/courses/reducers';
import {
  LoadCourses,
  FilterCourses,
  LoadCourse,
} from '../../state/courses/actions/courses';

@Component({
  selector: 'oms-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit, OnDestroy {
  @Input() displayedColumns: string[] = [];
  @Input() shortened: boolean = false;
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  courses$: Observable<any> | Promise<Observable<any>>;
  percent = false;
  grades: any;
  original: any;
  courses: any;
  specialization: any = 'all';
  sortObj = {
    type: '',
    dir: -1,
  };

  constructor(private store: Store<CoursesState>, private router: Router) {}

  ngOnInit() {
    this.courses$ = this.store.select(getSpecializationCourses);
    this.store.dispatch(new LoadCourses());
    this.dataSource = new MatTableDataSource([]);
    this.courses$.subscribe(courses => {
      if (courses) {
        this.dataSource.data = Object.keys(courses).map(
          courseId => courses[courseId]
        );
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.applyFilter('');
  }

  ngOnDestroy() {
    this.courses$ = null;
  }

  goToCourse(course) {
    this.router.navigate(['/courses', course]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  changeSpecialization(type) {
    this.specialization = type;
    this.store.dispatch(new FilterCourses(this.specialization));
  }
}
