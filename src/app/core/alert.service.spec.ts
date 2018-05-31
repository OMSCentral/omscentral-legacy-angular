import { TestBed, inject } from '@angular/core/testing';

import { AlertService } from './alert.service';

import { AngularFireDatabase } from 'angularfire2/database';
class MockAFDB {}

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: AngularFireDatabase, useClass: MockAFDB },
      ],
    });
  });

  it(
    'should be created',
    inject([AlertService], (service: AlertService) => {
      expect(service).toBeTruthy();
    })
  );
});
