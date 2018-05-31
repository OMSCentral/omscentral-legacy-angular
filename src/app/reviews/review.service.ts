import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { Review, ReviewFilter } from '../models/review';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../firebase/auth.service';
import { CourseService } from '../courses/course.service';
import { LocalStorageService } from '../core/local-storage.service';
import { QueryReference } from 'angularfire2/database/interfaces';
import { SettingsService } from '../core/settings.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../state/auth/reducers';
import { getUser } from '../state/auth/reducers';
import { User } from '../models/user';
import { getReviewEntities } from '../state/reviews/reducers';
import { map, take, switchMap } from 'rxjs/operators';

@Injectable()
export class ReviewService {
  auth: User;
  auth$: Observable<User>;
  review$: BehaviorSubject<Review> = new BehaviorSubject<Review>(null);
  constructor(
    private db: AngularFireDatabase,
    private store: Store<AuthState>,
    private courseService: CourseService,
    private localStorageService: LocalStorageService,
    private settingsService: SettingsService
  ) {
    this.auth$ = this.store.select(getUser);
    this.auth$.subscribe(auth => {
      this.auth = auth;
    });
  }

  downloadReview(reviewId) {
    return this.db.database
      .ref('/reviews/' + reviewId)
      .once('value')
      .then(snapshot => {
        const snap = snapshot.val();
        const review: Review = new Review(snap);
        review.id = reviewId;
        return review;
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

  processFilters(reviews: Review[]) {
    const filters: ReviewFilter = {
      semesters: {},
      difficulties: {},
      ratings: {},
      programs: {},
    };
    reviews.forEach(rev => {
      if (rev.semester && rev.semester !== '0000-0') {
        filters.semesters[rev.semester] = {
          id: rev.semester,
          selected: false,
          disabled: false,
        };
      }
      if (rev.difficulty) {
        filters.difficulties[rev.difficulty] = {
          id: rev.difficulty,
          selected: false,
          disabled: false,
        };
      }
      if (rev.rating) {
        filters.ratings[rev.rating] = {
          id: rev.rating,
          selected: false,
          disabled: false,
        };
      }
      if (rev.program) {
        filters.programs[rev.program] = {
          id: rev.program,
          selected: false,
          disabled: false,
        };
      }
    });
    return of(filters);
  }

  checkReview(reviewId) {
    return this.store.pipe(
      select(getReviewEntities),
      map(entities => {
        if (entities) {
          return entities[reviewId];
        } else {
          return;
        }
      }),
      switchMap(review => {
        if (!!review) {
          return of(review);
        } else {
          return this.downloadReview(reviewId);
        }
      }),
      take(1)
    );
  }

  getReview(reviewId) {
    return this.checkReview(reviewId);
  }

  getReviews(reviews: object) {
    const revs = [];
    if (reviews) {
      Object.keys(reviews).forEach(rev => {
        if (reviews[rev]) {
          revs.push(this.checkReview(rev));
        }
      });
    }
    return forkJoin(revs);
  }

  getRecentReviews(): Promise<Review[]> {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref('/reviews')
        .orderByChild('created')
        .limitToLast(10)
        .on('value', snapshot => {
          const reviewsObj = snapshot.val();
          const reviews: Review[] = Object.keys(reviewsObj || {})
            .map(reviewId => {
              const review: Review = new Review(reviewsObj[reviewId]);
              review.id = reviewId;
              return review;
            })
            .reverse();

          resolve(reviews);
        });
    });
  }

  sortBySemester(reviews, rev = false) {
    let sorted = reviews.sort((a, b) => {
      if (a && !b) {
        return 1;
      }
      if (b && !a) {
        return -1;
      }
      if (this.auth && a.author === this.auth.uid) {
        return rev ? 1 : -1;
      } else {
        if (this.auth && b.author === this.auth.uid) {
          return rev ? -1 : 1;
        } else {
          let aYear = 0;
          let aSem = 0;
          let bYear = 0;
          let bSem = 0;

          if (a.semester) {
            const aData = a.semester.split('-');
            aYear = parseInt(aData[0], 10);
            aSem = parseInt(aData[1], 10);
          }

          if (b.semester) {
            const bData = b.semester.split('-');
            bYear = parseInt(bData[0], 10);
            bSem = parseInt(bData[1], 10);
          }
          if (aYear === bYear) {
            return bSem - aSem;
          } else {
            return bYear - aYear;
          }
        }
      }
    });

    if (rev) {
      sorted = sorted.reverse();
    }

    return sorted;
  }

  sortByDate(reviews, rev = false) {
    let sorted = reviews.sort((a, b) => {
      if (this.auth && a.author === this.auth.uid) {
        return rev ? 1 : -1;
      } else {
        if (this.auth && b.author === this.auth.uid) {
          return rev ? -1 : 1;
        } else {
          let aDate, bDate;
          if (a.updated) {
            aDate = new Date(a.updated);
          } else {
            aDate = new Date(a.created);
          }

          if (b.updated) {
            bDate = new Date(b.updated);
          } else {
            bDate = new Date(b.created);
          }

          return aDate - bDate;
        }
      }
    });

    if (rev) {
      sorted = sorted.reverse();
    }

    return sorted;
  }
}
