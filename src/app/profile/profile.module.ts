import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ClarityModule } from 'clarity-angular';
import { ReviewsModule } from '../reviews/reviews.module';
import { UserService } from '../core/user.service';
import { ReviewService } from '../reviews/review.service';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ReviewsModule
  ],
  declarations: [ProfileComponent],
  providers: [ UserService, ReviewService ]
})
export class ProfileModule { }
