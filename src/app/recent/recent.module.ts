import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentComponent } from './recent.component';
import { ClarityModule } from 'clarity-angular';
import { PipeModule } from '../pipes/pipe.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { MarkdownModule } from 'angular2-markdown/markdown/markdown.module';
import { AppRoutingModule } from '../app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    PipeModule,
    ReviewsModule,
    MarkdownModule,
    AppRoutingModule,
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [RecentComponent]
})
export class RecentModule { }
