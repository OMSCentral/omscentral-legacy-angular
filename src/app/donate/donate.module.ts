import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate.component';
import { ClarityModule } from 'clarity-angular';
import { MarkdownModule } from 'angular2-markdown/markdown/markdown.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    MarkdownModule
  ],
  declarations: [DonateComponent]
})
export class DonateModule { }
