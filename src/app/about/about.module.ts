import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { CoreModule } from '../core/core.module';
import { MarkdownModule } from 'angular2-markdown/markdown/markdown.module';
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
    MarkdownModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AboutComponent],
})
export class AboutModule {}
