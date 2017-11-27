import { Pipe, PipeTransform } from '@angular/core';

const values = [
  '',
  'Strongly Disliked',
  'Disliked',
  'Neutral',
  'Liked',
  'Loved!'
];

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return values[value] || '';
  }

}
