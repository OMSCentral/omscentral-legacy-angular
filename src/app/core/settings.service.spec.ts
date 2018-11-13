import { TestBed, inject } from '@angular/core/testing';

import { SettingsService } from './settings.service';

import { AngularFireDatabase } from '@angular/fire/database';
class MockAFDB {}

describe('SettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsService,
        { provide: AngularFireDatabase, useClass: MockAFDB },
      ],
    });
  });

  it(
    'should be created',
    inject([SettingsService], (service: SettingsService) => {
      expect(service).toBeTruthy();
    })
  );
});
