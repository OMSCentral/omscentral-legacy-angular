import * as Raven from 'raven-js';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material';

import { StateModule } from './state/state.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { CoursesModule } from './courses/courses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CoreModule } from './core/core.module';
import { AboutModule } from './about/about.module';
import { GradesModule } from './grades/grades.module';
import { RecentModule } from './recent/recent.module';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';
import { PipeModule } from './pipes/pipe.module';

import { AuthGuard } from './firebase/auth.guard';
import { AuthService } from './firebase/auth.service';

import { GithubButtonModule } from 'angular-github-buttons';

import '@webcomponents/custom-elements/custom-elements.min.js';

import { MarkdownModule } from 'angular2-markdown';

import { PrivacyComponent } from './privacy/privacy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

Raven.config(
  'https://0e91a95e29e44c63b164865f792ec308@sentry.io/1216631'
).install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

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
    ProfileModule,
    RegisterModule,
    GithubButtonModule,
    CoursesModule,
    MarkdownModule.forRoot(),
    BrowserAnimationsModule,
    MatSidenavModule,
    StateModule.forRoot(),
    FlexLayoutModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    // { provide: ErrorHandler, useClass: RavenErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
