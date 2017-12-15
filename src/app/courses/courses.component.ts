import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../courses/course.service';
import { GradeService } from '../grades/grade.service';

const specializations = {
  cpr: ['6505', '6601', '7641', '8803', '6475', '6476', '8803-O01'],
  cs: ['6506', '8803', '6210', '6250', '6290', '6300', '6400', '6035', '6200', '6262', '6291', '6310', '6340', '6220'],
  ii: ['6300', '6505', '8803', '6601', '7637', '7641', '6440', '6460'],
  ml: ['6505', '8803', '7641', '7642', '7646', '6242', '6250']
};

@Component({
  selector: 'oms-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<any> | Promise<Observable<any>>;
  percent = false;
  grades: any;
  original: any;
  courses: any;
  specialization: any = 'all';

  constructor(private courseService: CourseService, private gradeService: GradeService, private router: Router) { }

  ngOnInit() {
    this.grades = this.gradeService.getGrades();
    this.courses$ = this.courseService.getCourses();
    this.courses$.subscribe(courses => {
      if (courses) {
        this.courses = courses.map(course => {
          course.grades = this.grades[course.id];
          return course;
        });
        this.original = courses.map(course => {
          course.grades = this.grades[course.id];
          return course;
        });
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
