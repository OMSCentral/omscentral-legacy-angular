import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './firebase/auth.guard';
import { AdminGuard } from './firebase/admin.guard';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { DonateComponent } from './donate/donate.component';
import { RegisterComponent } from './register/register.component';
import { CoursesComponent } from './courses/courses.component';
import { RecentComponent } from './recent/recent.component';
import { CourseComponent } from './courses/course/course.component';
import { NewReviewComponent } from './reviews/new-review/new-review.component';
import { PrivacyComponent } from './privacy/privacy.component';


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
    path: 'set-password',
    component: RegisterComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'recent',
    component: RecentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'courses/:courseId',
    component: CourseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews/:reviewId',
    component: NewReviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews',
    component: NewReviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews/:reviewId',
    component: CourseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'donate',
    component: DonateComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
