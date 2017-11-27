import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { ClarityModule } from 'clarity-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CoreModule } from './core/core.module';
import { AboutModule } from './about/about.module';
import { GradesModule } from './grades/grades.module';
import { DonateModule } from './donate/donate.module';
import { ProfileModule } from './profile/profile.module';

import { CourseService } from './core/course.service';
import { ReviewService } from './reviews/review.service';

import { AuthGuard } from './firebase/auth.guard';
import { AuthService } from './firebase/auth.service';

import '@webcomponents/custom-elements/custom-elements.min.js';
import 'clarity-icons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ClarityModule.forRoot(),
    LoginModule,
    ReactiveFormsModule,
    ReviewsModule,
    AboutModule,
    CoreModule,
    GradesModule,
    DonateModule,
    ProfileModule
  ],
  providers: [ AuthGuard, AuthService, CourseService, ReviewService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
