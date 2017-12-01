import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../core/course.service';
import { GradeService } from './grade.service';

@Component({
  selector: 'oms-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {
  courses$: Observable<any> | Promise<Observable<any>>;
  percent = true;
  grades: any;

  constructor(private courseService: CourseService, private gradeService: GradeService, private router: Router) {
    this.grades = gradeService.getGrades();
  }

  ngOnInit() {
    this.courses$ = this.courseService.getCourses();
  }

  goToCourse(course) {
    this.router.navigate(['/grades', course]);
  }
}
