import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '../../courses/course.service';

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
  selector: 'oms-course-nav',
  templateUrl: './course-nav.component.html',
  styleUrls: ['./course-nav.component.scss'],
})
export class CourseNavComponent implements OnInit {
  courses$: Observable<any> | Promise<Observable<any>>;
  percent = false;
  grades: any;
  original: any;
  courses: any;
  specialization: any = 'all';
  filter = '';

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.courses$ = this.courseService.getCourses();
    this.courses$.subscribe(courses => {
      if (courses) {
        this.courses = courses;
        this.original = courses;
      }
    });
  }

  goToCourse(course) {
    this.router.navigate(['/courses', course]);
  }

  changeSpecialization(type) {
    this.specialization = type;
    if (type === 'all') {
      this.courses = this.original;
    } else {
      this.courses = this.original.filter(course => {
        return specializations[type].indexOf(course.id) !== -1;
      });
    }
  }
}
