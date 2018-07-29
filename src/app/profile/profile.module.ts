import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ReviewsModule } from '../reviews/reviews.module';
import { UserService } from '../core/user.service';
import { LocalStorageService } from '../core/local-storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatProgressBarModule,
  MatListModule,
  MatCheckboxModule,
  MatButtonModule,
} from '@angular/material';
import { CoursesModule } from '../courses/courses.module';
import { PipeModule } from '../pipes/pipe.module';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReviewsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    CoursesModule,
    MatListModule,
    MatCheckboxModule,
    PipeModule,
    MatButtonModule,
  ],
  declarations: [ProfileComponent],
  providers: [UserService, LocalStorageService],
})
export class ProfileModule {}
