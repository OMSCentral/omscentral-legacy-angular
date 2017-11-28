import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../core/course.service';
@Component({
  selector: 'oms-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {
  courses$: Observable<any[]>;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.courses$ = this.courseService.getCourses();
  }

  goToCourse(course) {
    this.router.navigate(['/grades', course]);
  }
}
