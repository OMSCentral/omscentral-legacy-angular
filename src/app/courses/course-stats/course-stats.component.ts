import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oms-course-stats',
  templateUrl: './course-stats.component.html',
  styleUrls: ['./course-stats.component.scss']
})
export class CourseStatsComponent implements OnInit {
  @Input() course;
  @Input() grades;
  @Input() stats;

  displayedColumns = ['semester', 'total', 'a', 'b', 'c', 'd', 'f', 'w'];

  constructor() { }

  ngOnInit() {
  }

}
