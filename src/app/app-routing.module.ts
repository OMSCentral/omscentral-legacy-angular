import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './firebase/auth.guard';
import { environment } from '../environments/environment.prod';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/about/about.module#AboutModule',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
  },
  {
    path: 'register',
    loadChildren: 'app/register/register.module#RegisterModule',
  },
  {
    path: 'set-password',
    loadChildren: 'app/register/register.module#RegisterModule',
  },
  {
    path: 'courses',
    loadChildren: 'app/courses/courses.module#CoursesModule',
  },
  {
    path: 'privacy',
    loadChildren: 'app/privacy/privacy.module#PrivacyModule',
  },
  {
    path: 'recent',
    loadChildren: 'app/recent/recent.module#RecentModule',
  },
  {
    path: 'reviews',
    loadChildren:
      'app/authed-reviews/authed-reviews.module#AuthedReviewsModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: 'app/page-not-found/page-not-found.module#PageNotFoundModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: !environment.production }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
