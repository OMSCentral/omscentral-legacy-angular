import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { CoursesModule } from './courses/courses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { AboutModule } from './about/about.module';
import { GradesModule } from './grades/grades.module';
import { RecentModule } from './recent/recent.module';
import { RegisterModule } from './register/register.module';
import { DonateModule } from './donate/donate.module';
import { ProfileModule } from './profile/profile.module';
import { PipeModule } from './pipes/pipe.module';

import { CourseService } from './courses/course.service';
import { UserService } from './core/user.service';
import { SettingsService } from './core/settings.service';
import { AlertService } from './core/alert/alert.service';
import { LocalStorageService } from './core/local-storage.service';
import { ReviewService } from './reviews/review.service';
import { GradeService } from './grades/grade.service';
import { AuthorService } from './core/author.service';

import { AuthGuard } from './firebase/auth.guard';
import { AdminGuard } from './firebase/admin.guard';
import { AuthService } from './firebase/auth.service';

import { GithubButtonModule } from 'angular-github-buttons';

import '@webcomponents/custom-elements/custom-elements.min.js';

import { MarkdownModule } from 'angular2-markdown';

import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  declarations: [AppComponent, PrivacyComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoginModule,
    ReactiveFormsModule,
    ReviewsModule,
    RecentModule,
    AboutModule,
    CoreModule,
    GradesModule,
    DonateModule,
    ProfileModule,
    RegisterModule,
    GithubButtonModule,
    CoursesModule,
    AdminModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthService,
    CourseService,
    ReviewService,
    GradeService,
    LocalStorageService,
    AlertService,
    AuthorService,
    SettingsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
