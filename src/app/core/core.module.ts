import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AngularGithubButtonsModule } from 'angular-github-buttons';
import {
  MatToolbarModule,
  MatButtonModule,
  MatRippleModule,
  MatSnackBarModule,
  MatCardModule,
  MatSidenavModule,
} from '@angular/material';
import { AlertService } from './alert.service';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { SettingsService } from './settings.service';
import { CourseService } from './course.service';
import { ReviewService } from './review.service';
import { GradeService } from './grade.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AngularGithubButtonsModule,
    MatToolbarModule,
    MatButtonModule,
    MatRippleModule,
    MatSnackBarModule,
    MatCardModule,
    MatSidenavModule,
    RouterModule,
  ],
  exports: [NavComponent, SidebarComponent],
  declarations: [NavComponent, SidebarComponent],
  providers: [
    AlertService,
    LocalStorageService,
    UserService,
    SettingsService,
    CourseService,
    ReviewService,
    GradeService,
  ],
})
export class CoreModule {}
