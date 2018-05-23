import { TestBed, inject } from '@angular/core/testing';

import { CourseService } from './course.service';
import { LocalStorageService } from '../core/local-storage.service';

class MockLocal {
  getObject(asdf) {
    return {};
  }
  get(asdf) {
    return '';
  }
}

import { SettingsService } from '../core/settings.service';
class MockSettings {}

import { AngularFireDatabase } from 'angularfire2/database';
class MockAFDB {}

describe('CourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        { provide: AngularFireDatabase, useClass: MockAFDB },
        { provide: SettingsService, useClass: MockSettings },
        { provide: LocalStorageService, useClass: MockLocal },
      ],
    });
  });

  it(
    'should be created',
    inject([CourseService], (service: CourseService) => {
      expect(service).toBeTruthy();
    })
  );
});
