import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { CoreModule } from '../core/core.module';
import { MarkdownModule } from 'ngx-markdown';
import {
  MatSidenavModule,
  MatCardModule,
  MatListModule,
  MatButtonModule,
} from '@angular/material';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    CoreModule,
    MarkdownModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ],
  declarations: [AboutComponent],
})
export class AboutModule {}
