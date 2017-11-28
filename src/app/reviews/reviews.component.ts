import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../core/course.service';

@Component({
  selector: 'oms-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  courses$: Observable<any[]>;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.courses$ = this.courseService.getCourses();
  }

  goToCourse(course) {
    this.router.navigate(['/reviews', course]);
  }

}
