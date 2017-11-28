import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifficultyPipe } from '../pipes/difficulty.pipe';
import { SemesterPipe } from '../pipes/semester.pipe';
import { RatingPipe } from '../pipes/rating.pipe';
import { WorkloadPipe } from '../pipes/workload.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DifficultyPipe, SemesterPipe, RatingPipe, WorkloadPipe],
  exports: [DifficultyPipe, SemesterPipe, RatingPipe, WorkloadPipe]
})
export class PipeModule { }
