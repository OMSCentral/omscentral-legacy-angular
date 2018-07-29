import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifficultyPipe } from './difficulty.pipe';
import { SemesterPipe } from './semester.pipe';
import { RatingPipe } from './rating.pipe';
import { WorkloadPipe } from './workload.pipe';
import { ProgramPipe } from './program.pipe';
import { ReviewsPipe } from './reviews.pipe';
import { CoursePipe } from './course.pipe';
import { CoursesPipe } from './courses.pipe';
import { ReviewSortPipe } from './review-sort.pipe';
import { SortProgressPipe } from './sort-progress.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DifficultyPipe,
    SemesterPipe,
    RatingPipe,
    WorkloadPipe,
    ProgramPipe,
    ReviewsPipe,
    CoursePipe,
    CoursesPipe,
    ReviewSortPipe,
    SortProgressPipe,
  ],
  exports: [
    DifficultyPipe,
    SemesterPipe,
    RatingPipe,
    WorkloadPipe,
    ProgramPipe,
    ReviewsPipe,
    CoursePipe,
    CoursesPipe,
    ReviewSortPipe,
    SortProgressPipe,
  ],
})
export class PipeModule {}
