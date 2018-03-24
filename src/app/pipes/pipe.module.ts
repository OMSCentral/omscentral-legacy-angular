import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifficultyPipe } from '../pipes/difficulty.pipe';
import { SemesterPipe } from '../pipes/semester.pipe';
import { RatingPipe } from '../pipes/rating.pipe';
import { WorkloadPipe } from '../pipes/workload.pipe';
import { ProgramPipe } from './program.pipe';
import { ReviewsPipe } from './reviews.pipe';
import { CoursePipe } from './course.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DifficultyPipe, SemesterPipe, RatingPipe, WorkloadPipe, ProgramPipe, ReviewsPipe, CoursePipe],
  exports: [DifficultyPipe, SemesterPipe, RatingPipe, WorkloadPipe, ProgramPipe, ReviewsPipe, CoursePipe]
})
export class PipeModule { }
