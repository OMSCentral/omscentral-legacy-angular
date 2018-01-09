import { Pipe, PipeTransform } from '@angular/core';
import { Semester } from '../enums/semester.enum';
import { Season } from '../enums/season.enum';

@Pipe({
  name: 'semester'
})
export class SemesterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const semester = Semester[value];
    if (semester && (semester.season !== 0 && semester.year !== 0)) {
      return Season[semester.season] + ' ' + semester.year;
    } else {
      return;
    }
  }

}
