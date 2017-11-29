import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews.component';
import { CourseReviewsComponent } from './course-reviews/course-reviews.component';
import { ClarityModule } from 'clarity-angular';
import { PipeModule } from '../pipes/pipe.module';
import { ReviewComponent } from './review/review.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    PipeModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [ReviewsComponent, CourseReviewsComponent, ReviewComponent ]
})
export class ReviewsModule { }
