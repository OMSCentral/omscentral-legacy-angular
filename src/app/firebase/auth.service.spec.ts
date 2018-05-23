import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
class MockAF {
  authState = new BehaviorSubject({});
}

import { UserService } from '../core/user.service';
class MockUser {
  retrieveUser() {}
}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useClass: MockAF },
        { provide: UserService, useClass: MockUser },
      ],
    });
  });

  it(
    'should be created',
    inject([AuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    })
  );
});
