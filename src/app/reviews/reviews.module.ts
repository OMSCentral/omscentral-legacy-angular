import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews.component';
import { CourseReviewsComponent } from './course-reviews/course-reviews.component';
import { DifficultyPipe } from '../pipes/difficulty.pipe';
import { SemesterPipe } from '../pipes/semester.pipe';
import { RatingPipe } from '../pipes/rating.pipe';
import { WorkloadPipe } from '../pipes/workload.pipe';
import { ClarityModule } from 'clarity-angular';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [ReviewsComponent, CourseReviewsComponent, DifficultyPipe, SemesterPipe, RatingPipe, WorkloadPipe]
})
export class ReviewsModule { }
