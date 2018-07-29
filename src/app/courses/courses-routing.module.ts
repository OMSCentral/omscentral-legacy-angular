import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseGuard } from './course.guard';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    pathMatch: 'full',
  },
  {
    path: ':courseId',
    component: CourseComponent,
    canActivate: [CourseGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
