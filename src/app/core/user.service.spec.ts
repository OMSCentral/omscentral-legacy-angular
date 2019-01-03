import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

import { AngularFireDatabase } from '@angular/fire/database';
class MockAFDB {}

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AngularFireDatabase, useClass: MockAFDB },
      ],
    });
  });

  it(
    'should be created',
    inject([UserService], (service: UserService) => {
      expect(service).toBeTruthy();
    })
  );
});
