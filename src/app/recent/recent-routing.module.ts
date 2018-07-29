import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentComponent } from './recent.component';

const routes: Routes = [
  {
    path: '',
    component: RecentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentRoutingModule {}
