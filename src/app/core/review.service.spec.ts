import { TestBed, inject } from '@angular/core/testing';

import { ReviewService } from './review.service';

import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../firebase/auth.service';
class MockAuth {
  user = new BehaviorSubject({});
}

import { SettingsService } from './settings.service';
class MockSettings {}

import { LocalStorageService } from './local-storage.service';
class MockLocalStorage {
  getObject(asdf) {
    return {};
  }
  get(asdf) {
    return '';
  }
}

import { AngularFireDatabase } from '@angular/fire/database';
class MockAFDB {}

import { CourseService } from './course.service';
class MockCourse {
  getCourse() {
    return new BehaviorSubject({});
  }
}

describe('ReviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReviewService,
        { provide: AngularFireDatabase, useClass: MockAFDB },
        { provide: AuthService, useClass: MockAuth },
        { provide: SettingsService, useClass: MockSettings },
        { provide: CourseService, useClass: MockCourse },
        { provide: LocalStorageService, useClass: MockLocalStorage },
      ],
    });
  });

  it(
    'should be created',
    inject([ReviewService], (service: ReviewService) => {
      expect(service).toBeTruthy();
    })
  );
});
