import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseNavComponent } from './course-nav/course-nav.component';
import { ReviewsModule } from '../reviews/reviews.module';
import {
  MatCardModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatTooltipModule,
  MatChipsModule,
  MatCheckboxModule,
} from '@angular/material';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseStatsComponent } from './course-stats/course-stats.component';
import { CourseReviewsComponent } from './course-reviews/course-reviews.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '../core/core.module';
import { NgxMdModule } from 'ngx-md';
import { RouterModule } from '@angular/router';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CoursesRoutingModule,
    CoreModule,
    PipeModule,
    ReactiveFormsModule,
    ReviewsModule,
    FormsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    FlexLayoutModule,
    MatTooltipModule,
    NgxMdModule,
    MatChipsModule,
    MatCheckboxModule,
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseNavComponent,
    CourseListComponent,
    CourseStatsComponent,
    CourseReviewsComponent,
  ],
})
export class CoursesModule {}
