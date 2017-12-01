import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AuthGuard } from './firebase/auth.guard';
import { AboutComponent } from './about/about.component';
import { GradesComponent } from './grades/grades.component';
import { ProfileComponent } from './profile/profile.component';
import { DonateComponent } from './donate/donate.component';
import { CourseReviewsComponent } from './reviews/course-reviews/course-reviews.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reviews',
    component: ReviewsComponent
  },
  {
    path: 'reviews/:courseId',
    component: CourseReviewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'grades',
    component: GradesComponent
  },
  {
    path: 'donate',
    component: DonateComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
