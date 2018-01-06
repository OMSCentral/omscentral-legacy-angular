import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from 'clarity-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';

import { CourseService } from '../courses/course.service';
class MockCourse { }

import { AlertService } from '../core/alert/alert.service';
class MockAlert { }

import { SettingsService } from '../core/settings.service';
class MockSettings { }

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: CourseService, useClass: MockCourse },
        { provide: SettingsService, useClass: MockSettings },
        { provide: AlertService, useClass: MockAlert }
      ],
      declarations: [AdminComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
