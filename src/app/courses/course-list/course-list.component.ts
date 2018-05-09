import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GradeService } from '../../grades/grade.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CourseData } from '../../models/course';

import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { CoursesState } from '../../state/courses/reducers';
import { LoadCourses } from '../../state/courses/actions/courses';

const specializations = {
  cpr: [
    'CS-6505',
    'CS-8803-GA',
    'CS-6601',
    'CS-7641',
    'CS-8803-GA',
    'CS-6475',
    'CS-6476',
    'CS-8803-001',
  ],
  cs: [
    'CS-6035',
    'CS-6210',
    'CSE-6220',
    'CS-8803-GA',
    'CS-6250',
    'CS-6290',
    'CS-6300',
    'CS-6400',
    'CS-6262',
    'CS-6310',
    'CS-6340',
    'CS-6506',
    'CS-6200',
    'CS-6291',
    'CS-6505',
  ],
  ii: [
    'CS-6300',
    'CS-6505',
    'CS-8803-GA',
    'CS-6601',
    'CS-7637',
    'CS-7641',
    'CS-6440',
    'CS-6460',
  ],
  ml: [
    'CS-6505',
    'CS-6476',
    'CS-8803-GA',
    'CS-7641',
    'CS-7642',
    'CS-8803-003',
    'CS-7646',
    'CSE-6242',
    'CSE-6250',
    'CSE-6250',
  ],
};

@Component({
  selector: 'oms-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit, OnDestroy {
  @Input() displayedColumns: string[] = [];
  @Input() shortened: boolean = false;
  dataSource: MatTableDataSource<CourseData>;

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

  constructor(
    private store: Store<CoursesState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.courses$ = this.store.select('courses');
    this.store.dispatch(new LoadCourses());
    this.dataSource = new MatTableDataSource([]);
    this.courses$.subscribe(courses => {
      console.log(courses);
      this.dataSource.data = courses.courses.ids.map(id => courses.courses.entities[id]);
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
    if (type === 'all') {
      this.dataSource.data = this.original;
    } else {
      this.dataSource.data = this.original.filter(course => {
        return specializations[type].indexOf(course.id) !== -1;
      });
    }
  }
}
