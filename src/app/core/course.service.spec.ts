import { TestBed, inject } from '@angular/core/testing';

import { CourseService } from './course.service';
import { LocalStorageService } from './local-storage.service';

class MockLocal {
  getObject(asdf) {
    return {};
  }
  get(asdf) {
    return '';
  }
}

import { GradeService } from './grade.service';
class MockGrades {}

import { SettingsService } from './settings.service';
class MockSettings {}

import { AngularFireDatabase } from '@angular/fire/database';
class MockAFDB {}

describe('CourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        { provide: AngularFireDatabase, useClass: MockAFDB },
        { provide: GradeService, useClass: MockGrades },
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
