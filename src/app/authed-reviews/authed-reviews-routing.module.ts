import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewReviewComponent } from './new-review/new-review.component';

const routes: Routes = [
  {
    path: '',
    component: NewReviewComponent,
  },
  {
    path: ':reviewId',
    component: NewReviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthedReviewsRoutingModule {}
