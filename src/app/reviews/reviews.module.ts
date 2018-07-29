import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../pipes/pipe.module';
import { ReviewComponent } from './review/review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMdModule } from 'ngx-md';
import { AppRoutingModule } from '../app-routing.module';
import { NewReviewComponent } from './new-review/new-review.component';
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
import { ReviewService } from './review.service';

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMdModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ReviewComponent, NewReviewComponent],
  exports: [ReviewComponent],
  providers: [ReviewService],
})
export class ReviewsModule {}
