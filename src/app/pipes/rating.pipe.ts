import { Pipe, PipeTransform } from '@angular/core';
import { Rating } from '../enums/rating.enum';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Rating[value] || '';
  }

}
