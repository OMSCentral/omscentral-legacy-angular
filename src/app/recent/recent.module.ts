import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentComponent } from './recent.component';
import { ClarityModule } from 'clarity-angular';
import { PipeModule } from '../pipes/pipe.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { MarkdownModule } from 'angular2-markdown/markdown/markdown.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    PipeModule,
    ReviewsModule,
    MarkdownModule,
    AppRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [RecentComponent]
})
export class RecentModule { }
