import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '../../courses/course.service';
import { GradeService } from '../../grades/grade.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CourseData } from '../../models/course';

import * as _ from 'lodash';

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

const defaultGrades = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  f: 0,
  i: 0,
  s: 0,
  t: 0,
  u: 0,
  v: 0,
  w: 0,
  ab: 0,
  cdf: 0,
  total: 0,
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
    private courseService: CourseService,
    private gradeService: GradeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.grades = this.gradeService.getGrades();
    this.courses$ = this.courseService.getCourses();
    this.dataSource = new MatTableDataSource([]);
    this.courses$.subscribe(courses => {
      if (courses) {
        this.dataSource.data = courses.map(course => {
          if (this.grades[course.id]) {
            course.grades = this.grades[course.id];
          } else {
            if (this.grades[course.number]) {
              course.grades = this.grades[course.number];
            } else {
              course.grades = {
                totals: defaultGrades,
                percents: defaultGrades,
              };
            }
          }
          course.enrolled = course.grades.totals.total;
          course.work = course.average.workload;
          course.difficulty = course.average.difficulty;
          course.rating = course.average.rating;
          course.ab = course.grades.totals.ab;
          course.cdf = course.grades.totals.cdf;
          course.withdrew = course.grades.totals.w;
          return course;
        });
        this.original = courses.map(course => {
          if (this.grades[course.id]) {
            course.grades = this.grades[course.id];
          } else {
            if (this.grades[course.number]) {
              course.grades = this.grades[course.number];
            } else {
              course.grades = {
                totals: defaultGrades,
                percents: defaultGrades,
              };
            }
          }
          return course;
        });
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
    if (type === 'all') {
      this.dataSource.data = this.original;
    } else {
      this.dataSource.data = this.original.filter(course => {
        return specializations[type].indexOf(course.id) !== -1;
      });
    }
  }
}
