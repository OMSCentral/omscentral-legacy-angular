import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Review } from '../models/review';
import { AngularFireDatabase } from 'angularfire2/database';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth/reducers';
import { getUser } from '../state/auth/reducers';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthedReviewService {
  auth: User;
  auth$: Observable<User>;
  review$: BehaviorSubject<Review> = new BehaviorSubject<Review>(null);
  constructor(
    private db: AngularFireDatabase,
    private store: Store<AuthState>
  ) {
    this.auth$ = this.store.select(getUser);
    this.auth$.subscribe(auth => {
      this.auth = auth;
    });
  }

  push(review: Review) {
    const newReview = {
      created: new Date().getTime(),
      updated: new Date().getTime(),
      author: this.auth.uid,
      course: review.course,
      difficulty: review.difficulty,
      semester: review.semester,
      text: review.text,
      workload: review.workload,
      rating: review.rating,
      program: review.program,
      proctortrack: review.proctortrack || '',
      firstCourse: review.firstCourse || '',
      previousClasses: review.previousClasses || '',
      projects: review.projects || '',
      groupProjects: review.groupProjects || '',
      tests: review.tests || '',
      extraCredit: review.extraCredit || '',
      moneySpent: review.moneySpent || '',
      frontLoad: review.frontLoad || '',
    };
    const postRef: any = this.db.database.ref('/reviews/').push(newReview);
    const refKey = postRef.key;
    newReview['id'] = refKey;
    return of(new Review(newReview));
  }

  update(review: Review) {
    const updatedReview: any = {
      created: review.created || new Date().getTime(),
      updated: new Date().getTime(),
      author: this.auth.uid,
      course: review.course,
      difficulty: review.difficulty,
      semester: review.semester,
      text: review.text,
      workload: review.workload,
      rating: review.rating,
      program: review.program,
      proctortrack: review.proctortrack || '',
      firstCourse: review.firstCourse || '',
      previousClasses: review.previousClasses || '',
      projects: review.projects || '',
      groupProjects: review.groupProjects || '',
      tests: review.tests || '',
      extraCredit: review.extraCredit || '',
      moneySpent: review.moneySpent || '',
      frontLoad: review.frontLoad || '',
    };
    const postRef = this.db.database
      .ref('/reviews/' + review.id)
      .set(updatedReview);
    updatedReview.id = review.id;
    return of(new Review(updatedReview));
  }

  remove(review) {
    return this.db.database
      .ref('/reviews/' + review.id)
      .remove()
      .then(() => {
        return review;
      });
  }
}
