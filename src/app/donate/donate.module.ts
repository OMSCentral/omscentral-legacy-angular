import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate.component';
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
    MarkdownModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ],
  declarations: [DonateComponent],
})
export class DonateModule {}
