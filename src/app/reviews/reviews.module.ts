import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews.component';
import { CourseReviewsComponent } from './course-reviews/course-reviews.component';

@NgModule({
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [ReviewsComponent, CourseReviewsComponent]
})
export class ReviewsModule { }
