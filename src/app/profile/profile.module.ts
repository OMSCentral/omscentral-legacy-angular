import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ClarityModule } from 'clarity-angular';
import { ReviewsModule } from '../reviews/reviews.module';
import { UserService } from '../core/user.service';
import { ReviewService } from '../reviews/review.service';
import { LocalStorageService } from '../core/local-storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ReviewsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [ProfileComponent],
  providers: [ UserService, ReviewService, LocalStorageService ]
})
export class ProfileModule { }
