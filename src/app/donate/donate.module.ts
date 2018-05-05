import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate.component';
import { MarkdownModule } from 'angular2-markdown/markdown/markdown.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, MarkdownModule, NgbModule],
  declarations: [DonateComponent],
})
export class DonateModule {}
