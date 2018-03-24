import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AlertComponent } from './alert/alert.component';
import { AppRoutingModule } from '../app-routing.module';
import { ClarityModule } from 'clarity-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GithubButtonModule} from 'angular-github-buttons';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ClarityModule,
    GithubButtonModule,
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [NavComponent, SidebarComponent, AlertComponent],
  declarations: [NavComponent, SidebarComponent, AlertComponent]
})
export class CoreModule { }
