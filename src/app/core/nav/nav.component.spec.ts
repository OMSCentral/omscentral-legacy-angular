import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

import { AuthService } from '../../firebase/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
class MockAuth {
  user = new BehaviorSubject({});
}

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [{provide: AuthService, useClass: MockAuth }],
      declarations: [ NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
