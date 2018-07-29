import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentComponent } from './recent.component';
import { PipeModule } from '../pipes/pipe.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { NgxMdModule } from 'ngx-md';
import { MatCardModule } from '@angular/material';
import { RecentRoutingModule } from './recent-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RecentRoutingModule,
    PipeModule,
    ReviewsModule,
    NgxMdModule,
    MatCardModule,
  ],
  declarations: [RecentComponent],
})
export class RecentModule {}
