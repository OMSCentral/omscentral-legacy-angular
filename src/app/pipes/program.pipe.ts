import { Pipe, PipeTransform } from '@angular/core';
import { Programs } from '../enums/programs.enum';

@Pipe({
  name: 'program'
})
export class ProgramPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Programs[value] || value;
  }

}
