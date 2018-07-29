import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { CoreModule } from '../core/core.module';
import { NgxMdModule } from 'ngx-md';
import {
  MatSidenavModule,
  MatCardModule,
  MatListModule,
  MatButtonModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgxMdModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AboutComponent],
})
export class AboutModule {}
