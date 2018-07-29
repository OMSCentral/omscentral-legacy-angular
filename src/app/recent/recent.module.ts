import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentComponent } from './recent.component';
import { PipeModule } from '../pipes/pipe.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { NgxMdModule } from 'ngx-md';
import { AppRoutingModule } from '../app-routing.module';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
    ReviewsModule,
    NgxMdModule,
    AppRoutingModule,
    MatCardModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [RecentComponent],
})
export class RecentModule {}
