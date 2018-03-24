import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { PipeModule } from '../pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './courses.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseComponent } from './course/course.component';
import { CourseNavComponent } from './course-nav/course-nav.component';
import { ReviewsModule } from '../reviews/reviews.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ClarityModule,
    PipeModule,
    ReactiveFormsModule,
    NgbModule,
    ReviewsModule,
    FormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [CoursesComponent, CourseComponent, CourseNavComponent]
})
export class CoursesModule { }
