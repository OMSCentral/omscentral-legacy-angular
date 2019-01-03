import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GradeService } from '../../core/grade.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Course } from '../../models/course';

import * as _ from 'lodash';
import { Store, select } from '@ngrx/store';
import {
  CoursesState,
  getSpecializationCourses,
  getCoursesSort,
} from '../../state/courses/reducers';
import {
  LoadCourses,
  FilterCourses,
  LoadCourse,
  ChangeCoursesSort,
} from '../../state/courses/actions/courses';
import { take } from 'rxjs/operators';

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
        this.dataSource.data = Object.keys(courses).map(courseId => {
          let abpercent = 0;
          let cdfpercent = 0;
          if (courses[courseId].ab && courses[courseId].enrolled) {
            abpercent =
              100 * (courses[courseId].ab / courses[courseId].enrolled);
          }
          if (courses[courseId].cdf && courses[courseId].enrolled) {
            cdfpercent =
              100 * (courses[courseId].cdf / courses[courseId].enrolled);
          }
          return {
            ...courses[courseId],
            abpercent,
            cdfpercent,
          };
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(courseSort => {
      this.store.dispatch(new ChangeCoursesSort(courseSort));
    });
    this.store.pipe(select(getCoursesSort), take(1)).subscribe(coursesSort => {
      if (coursesSort) {
        this.sort.active = coursesSort.active;
        this.sort.direction = coursesSort.direction;
      }
    });
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
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
