import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, PageNotFoundRoutingModule, MatCardModule],
  declarations: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
