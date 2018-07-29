import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '../core/course.service';

@Injectable({
  providedIn: 'root',
})
export class CourseGuard implements CanActivate {
  constructor(private courseService: CourseService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.courseService.courseExists(next.params.courseId)) {
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }
}
