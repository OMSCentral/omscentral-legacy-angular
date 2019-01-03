import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../pipes/pipe.module';
import { ReviewComponent } from './review/review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import {
  MatCardModule,
  MatTooltipModule,
  MatButtonModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
    ReactiveFormsModule,
    MarkdownModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    RouterModule,
  ],
  declarations: [ReviewComponent],
  exports: [ReviewComponent],
})
export class ReviewsModule {}
