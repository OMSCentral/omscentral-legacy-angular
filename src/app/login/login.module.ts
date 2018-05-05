import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AuthService } from '../firebase/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LoginComponent],
  providers: [AuthService],
})
export class LoginModule {}
