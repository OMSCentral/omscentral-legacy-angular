import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

import { ClarityModule } from 'clarity-angular';
import { AuthService } from '../firebase/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
class MockAuth {
  user = new BehaviorSubject({});
}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, ReactiveFormsModule, FormsModule, RouterTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [{provide: AuthService, useClass: MockAuth}],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
