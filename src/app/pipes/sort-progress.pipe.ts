import { Pipe, PipeTransform } from '@angular/core';
import { Specialization } from '../models/specialization';

@Pipe({
  name: 'sortProgress',
})
export class SortProgressPipe implements PipeTransform {
  transform(
    specializations: Specialization[],
    courses: string[]
  ): Specialization[] {
    return specializations.sort((a, b) => {
      return b.progress(courses) - a.progress(courses);
    });
  }
}
