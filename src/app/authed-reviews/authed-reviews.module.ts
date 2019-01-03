import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthedReviewsRoutingModule } from './authed-reviews-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthedReviewEffects } from './authed-review.effects';
import { NewReviewComponent } from './new-review/new-review.component';
import { AuthedReviewService } from './authed-review.service';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
} from '@angular/material';
import { MarkdownModule } from 'ngx-markdown';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    AuthedReviewsRoutingModule,
    EffectsModule.forFeature([AuthedReviewEffects]),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MarkdownModule,
    ReactiveFormsModule,
    PipeModule,
    MatButtonModule,
  ],
  providers: [AuthedReviewService],
  declarations: [NewReviewComponent],
  exports: [NewReviewComponent],
})
export class AuthedReviewsModule {}
