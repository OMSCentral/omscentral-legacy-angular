import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reviews',
  pure: false,
})
export class ReviewsPipe implements PipeTransform {
  semesterFilter(review, filters) {
    const semesters = Object.keys(filters.semesters).filter(sem => {
      return filters.semesters[sem].selected;
    });
    if (semesters.length === 0) {
      return true;
    } else {
      return semesters.indexOf(review.semester) !== -1;
    }
  }

  difficultyFilter(review, filters) {
    const difficulties = Object.keys(filters.difficulties).filter(sem => {
      return filters.difficulties[sem].selected;
    });
    if (difficulties.length === 0) {
      return true;
    } else {
      return difficulties.indexOf(review.difficulty) !== -1;
    }
  }

  ratingFilter(review, filters) {
    const ratings = Object.keys(filters.ratings).filter(sem => {
      return filters.ratings[sem].selected;
    });
    if (ratings.length === 0) {
      return true;
    } else {
      return ratings.indexOf(review.rating) !== -1;
    }
  }

  transform(reviews: any, filters: any): any {
    const filtered = reviews.filter(review => {
      return (
        this.semesterFilter(review, filters) &&
        this.difficultyFilter(review, filters) &&
        this.ratingFilter(review, filters)
      );
    });
    return filtered;
  }
}
