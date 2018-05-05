import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate.component';
import { MarkdownModule } from 'angular2-markdown/markdown/markdown.module';

@NgModule({
  imports: [CommonModule, MarkdownModule],
  declarations: [DonateComponent],
})
export class DonateModule {}
