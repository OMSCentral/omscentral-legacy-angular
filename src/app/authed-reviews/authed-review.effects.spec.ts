import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuthedReviewEffects } from './authed-review.effects';

describe('AuthedReviewService', () => {
  let actions$: Observable<any>;
  let effects: AuthedReviewEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthedReviewEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AuthedReviewEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
