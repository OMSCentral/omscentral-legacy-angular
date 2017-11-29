import { Injectable } from '@angular/core';

import * as jsonData from '../../../grades.json';

@Injectable()
export class GradeService {
  courseGrades: any;

  constructor() { }

  getGrades() {
    const courseGrades = (<any>jsonData);
    this.courseGrades = courseGrades;
    return this.courseGrades;
  }

}
